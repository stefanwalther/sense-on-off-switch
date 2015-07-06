define( [
		'jquery',
		'underscore',
		'angular',
		'qlik',
		'./properties',
		'./initialproperties',
		'./lib/js/extensionUtils',
		'text!./lib/css/style.css',
		'text!./lib/partials/template.ng.html'
	],
	function ( $, _, angular, qlik, props, initProps, extensionUtils, cssContent, ngTemplate ) {
		'use strict';

		extensionUtils.addStyleToHeader( cssContent );

		return {

			definition: props,
			initialProperties: initProps,
			snapshot: {canTakeSnapshot: false},
			template: ngTemplate,
			controller: ['$scope', function ( $scope ) {

				function stringToBoolean ( string ) {
					switch ( string.toLowerCase() ) {
						case "true":
						case "yes":
						case "1":
							return true;
						case "false":
						case "no":
						case "0":
						case null:
							return false;
						default:
							return Boolean( string );
					}
				}

				var app = qlik.currApp();
				var varName = $scope.layout.props.varName;

				$scope.isSelected = null; // default value

				var init = function ( numTries ) {

					if ( !numTries ) {
						console.info( 'first try' );
						numTries = 0;
					}
					if ( numTries > 2 ) {
						console.error( 'Tried 3 times to get the value for ' + varName + ', didn\'t succeed ...' );
						return;
					}
					if ( numTries > 0 ) {
						console.info( 'try it again' );
					}

					//console.log( 'varName', varName );

					app.variable.getContent( varName )
						.then( function ( reply ) {
							$scope.isSelected = stringToBoolean( reply.qContent.qString );
							console.log( 'Initial value for ' + varName, reply );
						} )
						.catch( function ( error ) {
							numTries++;
							console.error( 'Error for ' + varName + ', try it again' );
							init( numTries );
						} );
				};

				$scope.$watch( 'isSelected', function ( newVal, oldVal ) {
					console.log( 'SELECTED: ', newVal + ' (old=>' + oldVal + ')' );
					if ( newVal !== null && newVal !== oldVal ) {
						console.log( '--variable values has changed, send it to the engine' );
						app.variable.setContent( varName, '=(' + (newVal === true ? 1 : 0) + ')' )
							.then( function ( reply ) {
								angular.noop();
								console.log( 'after setting var value', reply );
							} )
							.catch( function ( reply ) {
								console.error( 'error setting value', reply );
							} );
					}
				} );
				$scope.$watch( 'layout.props.varName', function ( newVal, oldVal ) {
					console.log( 'VARNAME: ', newVal + ' (old=>' + oldVal + ')' );
					if ( newVal !== oldVal ) {
						console.log( '--variable name has changed, init' );
						init();
					}
				} );
				init();

			}]
		};

	} );
