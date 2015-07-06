Drag and drop the visualization extension onto a sheet and define

* the name of the variable
* the layout

![](docs/images/prop-panel.png)

### Variable
The variable will not be created by the extension, you have to create the variable in your data load script, e.g.

```bash
SET vOnOffSwitch = 0; // false
or 
SET vOnOffSwitch = 1; // true
```

### Default values

The following variable lower-cased values will be interpreted as false:

* `false`
* `no`
* `0`

whereas

* `true`
* `no`
* `1`

### Values set
If the user switches the on-off switch to false the variable value will be set to `0`, otherwise to `1`.