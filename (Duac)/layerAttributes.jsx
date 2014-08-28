/*
	

Duac / Duduf Actions for After Effects
Copyright (c) 2010 Nicolas Dufresne
http://www.duduf.net



This file is part of Duac.

     Duac is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

     Duac is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with  Duac. If not, see <http://www.gnu.org/licenses/>.
*/	


/* Duduf Actions for After Effects
	layerAttributes : Opacité du calque

	*/

        //fichier temporaire d'échange entre scripts
        var tmp = new File(Folder.startup.absoluteURI + "/Scripts/(Duac)/tmp.jsx");
		tmp.open("w");
		tmp.write("#");
		tmp.close();

        var fenetre = new Window("dialog","Attributs Calque");
        fenetre.bounds = [300,300,452,642];

        var enabled = fenetre.add("checkbox",[22,2,150,20],"Affiché");
        enabled.enabled = false;
        enabled.value = true;
        var enabledS = fenetre.add("checkbox",[2,2,20,20],"");
        enabledS.onClick = function () {
            enabled.enabled = enabledS.value;
            }
        var audio = fenetre.add("checkbox",[22,22,150,40],"Audio"); 
        audio.enabled = false;
        audio.value = false;
        var audioS = fenetre.add("checkbox",[2,22,20,40],"");   
        audioS.onClick = function () {
            audio.enabled = audioS.value;
            }
        var solo = fenetre.add("checkbox",[22,42,150,60],"Solo");
        solo.enabled = false;
        solo.value = false;
        var soloS = fenetre.add("checkbox",[2,42,20,60],"");
        soloS.onClick = function () {
            solo.enabled = soloS.value;
            }
        var locked = fenetre.add("checkbox",[22,62,150,80],"Verrouillé");
        locked.enabled = false;
        locked.value = false;
        var lockedS = fenetre.add("checkbox",[2,62,20,80],"");
        lockedS.onClick = function () {
            locked.enabled = lockedS.value;
            }
        var shy = fenetre.add("checkbox",[22,82,150,100],"Discret");
        shy.enabled = false;
        shy.value = false;
        var shyS = fenetre.add("checkbox",[2,82,20,100],"");
        shyS.onClick = function () {
            shy.enabled = shyS.value;
            }
        var collapseTransformations = fenetre.add("checkbox",[22,102,150,120],"Continuité");
        collapseTransformations.enabled = false;
        collapseTransformations.value = false;
        var collapseTransformationsS = fenetre.add("checkbox",[2,102,20,120],"");
        collapseTransformationsS.onClick = function () {
            collapseTransformations.enabled = collapseTransformationsS.value;
            }
        var quality = fenetre.add("checkbox",[22,122,150,140],"Ebauche");
        quality.enabled = false;
        quality.value = false;
        var qualityS = fenetre.add("checkbox",[2,122,20,140],"");
        qualityS.onClick = function () {
            quality.enabled = qualityS.value;
            }
        var fx = fenetre.add("checkbox",[22,142,150,160],"FX activés");
        fx.enabled = false;
        fx.value = true;
        var fxS = fenetre.add("checkbox",[2,142,20,160],"");
        fxS.onClick = function () {
            fx.enabled = fxS.value;
            }
        var interpolation = fenetre.add("checkbox",[2,162,150,180],"Interpolation :");
        interpolation.onClick = function () {
            interpolationNo.enabled = interpolation.value;
            interpolationMid.enabled = interpolation.value;
            interpolationTop.enabled = interpolation.value;      
            }
        var interpolationNo = fenetre.add("radiobutton",[22,182,150,200],"Aucune");
        interpolationNo.enabled = false;
        interpolationNo.value = true;
        var interpolationMid = fenetre.add("radiobutton",[22,202,150,220],"Moyenne");
        interpolationMid.enabled = false;
        var interpolationTop = fenetre.add("radiobutton",[22,222,150,240],"Meilleure");
        interpolationTop.enabled = false;
        var mb = fenetre.add("checkbox",[22,242,150,260],"Flou de mouvement");
        mb.enabled = false;
        mb.value = false;
        var mbS = fenetre.add("checkbox",[2,242,20,260],"");
        mbS.onClick = function () {
            mb.enabled = mbS.value;
            }
        var fxLayer = fenetre.add("checkbox",[22,262,150,280],"Calque d'effets");
        fxLayer.enabled = false;
        fxLayer.value = false;
        var fxLayerS = fenetre.add("checkbox",[2,262,20,280],"");
        fxLayerS.onClick = function () {
            fxLayer.enabled = fxLayerS.value;
            }
        var tridi = fenetre.add("checkbox",[22,282,150,300],"Calque 3D");
        tridi.enabled = false;
        tridi.value = false;
        var tridiS = fenetre.add("checkbox",[2,282,20,300],"");
        tridiS.onClick = function () {
            tridi.enabled = tridiS.value;
            }
        var guide = fenetre.add("checkbox",[22,302,150,320],"Calque repère");
        guide.enabled = false;
        guide.value = false;
        var guideS = fenetre.add("checkbox",[2,302,20,320],"");
        guideS.onClick = function () {
            guide.enabled = guideS.value;
            }
        
       
        //bouton ok construire le code
		var ok = fenetre.add("button",[2,322,150,340],"OK");
        
		ok.onClick = function () {

		var script = "//#layerAttributes \n" +
        "for (i=0;i<app.project.activeItem.selectedLayers.length;i++) {\n";
        if (enabledS.value) script += "app.project.activeItem.selectedLayers[i].enabled = " + enabled.value + ";\n";
        if (audioS.value) script += "app.project.activeItem.selectedLayers[i].audioEnabled = " + audio.value + ";\n";
        if (soloS.value) script += "app.project.activeItem.selectedLayers[i].solo = " + solo.value + ";\n";
        if (shyS.value) script += "app.project.activeItem.selectedLayers[i].shy = " + shy.value + ";\n";
        if (collapseTransformationsS.value) script += "app.project.activeItem.selectedLayers[i].collapseTransformation = " + collapseTransformations.value + ";\n";
        if (qualityS.value) script += "app.project.activeItem.selectedLayers[i].quality = " + (quality.value ? "LayerQuality.DRAFT" : "LayerQuality.BEST") + ";\n";
        if (fxS.value) script += "app.project.activeItem.selectedLayers[i].effectsActive = " + fx.value + ";\n";
        if (interpolation.value && interpolationNo.value) script += "app.project.activeItem.selectedLayers[i].frameBlendingType = FrameBlendingType.NO_FRAME_BLEND;\n";
        if (interpolation.value && interpolationMid.value) script += "app.project.activeItem.selectedLayers[i].frameBlendingType = FrameBlendingType.FRAME_MIX;\n";
        if (interpolation.value && interpolationTop.value) script += "app.project.activeItem.selectedLayers[i].frameBlendingType = FrameBlendingType.PIXEL_MOTION;\n";
        if (mbS.value) script += "app.project.activeItem.selectedLayers[i].motionBlur = " + mb.value + ";\n";        
        if (fxLayerS.value) script += "app.project.activeItem.selectedLayers[i].adjustmentLayer = " + fxLayer.value + ";\n";        
        if (tridiS.value) script += "app.project.activeItem.selectedLayers[i].threeDLayer = " + tridi.value + ";\n";    
        if (guideS.value) script += "app.project.activeItem.selectedLayers[i].guideLayer = " + guide.value + ";\n";
        if (lockedS.value) script += "app.project.activeItem.selectedLayers[i].locked = " + locked.value + ";\n";
        script += "}\n\n";
         
         
         
         
         
         
         
        


		//enregistrer le code dans un fichier temporaire
        var tmp = new File(Folder.startup.absoluteURI + "/Scripts/(Duac)/tmp.jsx");
		tmp.open("w");
		tmp.write(script);
		tmp.close();
        delete tmp;
        fenetre.hide();	
            }
        
        
        fenetre.show();