bootstrap-google-plus
=====================

A Bootstrap Google Plus style theme and template for Bootstrap 3.

[Demo page](http://iatek.github.io/bootstrap-google-plus/)
--

![Screenshot](http://site2img-api.herokuapp.com/1090782895)

This is a Google+ inspired responsive starter template for Bootstrap. The theme is created using simple, lightweight (~3kb) CSS overides. The example template features:

 - responsive 3-2-1 column layout
 - 2 top navs
 - fluid columns and flat design
 - toggle grid layout button
 - login modal
 - about modal
 - element examples
 
To use, just place theme.css after your bootstrap 3 css. This and other Bootstrap templates are available at: http://bootply.com/templates



		<!--about modal-->
	<div ng-controller="superCtrl">
	<script type="text/ng-template" id="super.html">

			  <div class="modal-header">
            <h3 class="modal-title">Im a modal</h3>
        	</div>


			  <div class="modal-body">
						  <div class="progress">
						<div class="progress-bar progress-bar-danger" style="width: 50%"></div>
					  </div>
					  <p>Number</p>
					  <form>
					  <input type="text" value="input answer"/>
					</form>

			  </div>

			  <div class="modal-footer">
            <button class="btn btn-primary" ng-click="ok()">OK</button>
        </div>
    </script>
	</div>
