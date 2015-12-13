<!DOCTYPE html>
<html ng-app="app">
<head lang="en">
    <meta charset="UTF-8">
    <title>SPA Framework</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>

    <link href="bower_components/bootstrap/dist/css/bootstrap.css" rel="stylesheet">
    <link href="lib/font-awesome.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="lib/angular-gridster/angular-gridster.min.css"/>

    
    <link href="app/app.css" rel="stylesheet">

    <!-- Widgets CSS Files -->
    <link rel="stylesheet" href="app/widgets/kaTemperature/kaTemperature.css"/>
    <link rel="stylesheet" href="app/widgets/expences/expenceswidgetstyles.css"/>
    <link rel="stylesheet" href="dist/spaframework.css"/>

    <script src="bower_components/jquery/dist/jquery.js"></script>
    <script src="bower_components/angular/angular.js"></script>
    <script src="lib/angular-animate.min.js"></script>
    <script src="lib/angular-route.min.js"></script>
    <script src="lib/angular-gridster/angular-gridster.min.js"></script>
    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="lib/ui-bootstrap-tpls-0.14.3.min.js"></script>
    <script src="lib/ngStorage.min.js"></script>

    <script src="dist/spaframework.js"></script>

    <script src="app/appmodule.js"></script>
    <script src="app/approuteconfig.js"></script>
    <script src="app/appdashboarddirective.js"></script>
    <script src="app/guidesdirective.js"></script>
    <script src="app/locationdirective.js"></script>
    <script src="app/services/dataService.js"></script>

    <!-- Widgets Javascript Files -->
    <script src="app/widgets/kaTemperature/kaTemperatureDirective.js"></script>
    <script src="app/widgets/expences/expenceswidgetdirective.js"></script>
    <script src="app/dialogs/expensesWidgetSettingsController.js"></script>
    <script src="app/dialogs/temperatureWidgetSettingsController.js"></script>

</head>
<body class="container-fluid">

    <spa-framework title="Kithulgala Adventures"
                   subtitle="Administrative App"
                   icon-file="images/kayak-icon-flat.png">

        <spa-menu>
            <spa-menu-item label="Dashboard" icon="fa-tachometer" route="dashboard"></spa-menu-item>
            <spa-menu-item label="Location" icon="fa-location-arrow" route="locations"></spa-menu-item>
            <spa-menu-item label="Raft Guides" icon="fa-user" route="guides"></spa-menu-item>
            <spa-menu-group label="Equipment" icon="fa-gears">
                <spa-menu-item label="Rafts" icon="fa-unlink" route="rafts"></spa-menu-item>
                <spa-menu-item label="Paddles" icon="fa-magic" route="paddles"></spa-menu-item>
                <spa-menu-item label="Life Vests" icon="fa-life-ring" route="vests"></spa-menu-item>
            </spa-menu-group>
        </spa-menu>

    </spa-framework>

</body>
</html>