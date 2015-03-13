/*global define*/
define( [
	'jquery',
	'underscore',
	'qlik',
	'ng!$q'
], function ( $, _, qlik, $q ) {
	'use strict';

	// ****************************************************************************************
	// Other Settings
	// ****************************************************************************************

	var varName = {
		ref: "props.varName",
		label: "Variable Name",
		type: "string",
		expression: "optional",
		show: true
	};

	var style = {
		ref: "props.style",
		label: "Style",
		component: "dropdown",
		show: true,
		defaultValue: "default",
		options: [
			{
				value: "default",
				label: "Default"
			},
			{
				value: "primary",
				label: "Primary"
			},
			{
				value: "success",
				label: "Success"
			},
			{
				value: "info",
				label: "Info"
			},
			{
				value: "warning",
				label: "Warning"
			},
			{
				value: "danger",
				label: "Danger"
			}
		]
	};

	// ****************************************************************************************
	// Property Panel Definition
	// ****************************************************************************************

	// Appearance Panel
	var appearancePanel = {
		uses: "settings",
		items: {
			props: {
				type: "items",
				label: "Behavior",
				items: {
					varName: varName,
					style: style
				}
			}
		}
	};

	// Return values
	return {
		type: "items",
		component: "accordion",
		items: {
			appearance: appearancePanel

		}
	};

} );
