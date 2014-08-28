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
	layerAlpha : Mode de fusion et alpha du calque

	*/

        //fichier temporaire d'échange entre scripts
        var tmp = new File(Folder.startup.absoluteURI + "/Scripts/(Duac)/tmp.jsx");
		tmp.open("w");
		tmp.write("#");
		tmp.close();

        //fenètre de config
		fenetre = new Window("dialog","Mode de fusion et alpha");
		fenetre.bounds = [300,300,800,342];
		var fusion = fenetre.add("dropdownlist",[2,2,250,20],["normal","fondu","fondu dansant","obscurcir","produit","densité couleur +","densité couleur + classique","densité linéaire +","couleur plus foncée","addition","éclaircir","écran","densité couleur -","densité couleur - classique","densité linéaire -","couleur plus claire","incrustation","lumière douce","lumière crue","lumière linéaire","lumière vive","lumière neutre","contraste","écart","écart classique","exclusion","teinte","saturation","couleur","luminosité","modèle alpha","luminance du modèle","silhouette alpha","luminance de silhouette","ajout alpha","prémultiplier la luminescence"]);
		var alpha = fenetre.add("dropdownlist",[252,2,498,20],["aucun","alpha","alpha inversé","luminance","luminance inversé"]);
        fusion.selection = 0;
        alpha.selection = 0;

		//bouton ok / test, construire le code
		var ok = fenetre.add("button",[200,22,298,40],"OK");
        
        
		ok.onClick = function () {
         if (fusion.selection.index == 0) modeFusion = "BlendingMode.NORMAL";
         if (fusion.selection.index == 1) modeFusion = "BlendingMode.DISSOLVE";
         if (fusion.selection.index == 2) modeFusion = "BlendingMode.DANCING_DISSOLVE";
         if (fusion.selection.index == 3) modeFusion = "BlendingMode.DARKEN";
         if (fusion.selection.index == 4) modeFusion = "BlendingMode.MULTIPLY";
         if (fusion.selection.index == 5) modeFusion = "BlendingMode.COLOR_BURN";
         if (fusion.selection.index == 6) modeFusion = "BlendingMode.CLASSIC_COLOR_BURN";
         if (fusion.selection.index == 7) modeFusion = "BlendingMode.LINEAR_BURN";
         if (fusion.selection.index == 8) modeFusion = "BlendingMode.DARKER_COLOR";
         if (fusion.selection.index == 9) modeFusion = "BlendingMode.ADD";
         if (fusion.selection.index == 10) modeFusion = "BlendingMode.LIGHTEN";
         if (fusion.selection.index == 11) modeFusion = "BlendingMode.SCREEN";
         if (fusion.selection.index == 12) modeFusion = "BlendingMode.COLOR_DODGE";
         if (fusion.selection.index == 13) modeFusion = "BlendingMode.CLASSIC_COLOR_DODGE";
         if (fusion.selection.index == 14) modeFusion = "BlendingMode.LINEAR_DODGE";
         if (fusion.selection.index == 15) modeFusion = "BlendingMode.LIGHTER_COLOR";
         if (fusion.selection.index == 16) modeFusion = "BlendingMode.OVERLAY";
         if (fusion.selection.index == 17) modeFusion = "BlendingMode.SOFT_LIGHT";
         if (fusion.selection.index == 18) modeFusion = "BlendingMode.HARD_LIGHT";
         if (fusion.selection.index == 19) modeFusion = "BlendingMode.LINEAR_LIGHT";
         if (fusion.selection.index == 20) modeFusion = "BlendingMode.VIVID_LIGHT";
         if (fusion.selection.index == 21) modeFusion = "BlendingMode.PIN_LIGHT";
         if (fusion.selection.index == 22) modeFusion = "BlendingMode.HARD_MIX";
         if (fusion.selection.index == 23) modeFusion = "BlendingMode.DIFFERENCE";
         if (fusion.selection.index == 24) modeFusion = "BlendingMode.CLASSIC_DIFFERENCE";
         if (fusion.selection.index == 25) modeFusion = "BlendingMode.EXCLUSION";
         if (fusion.selection.index == 26) modeFusion = "BlendingMode.HUE";
         if (fusion.selection.index == 27) modeFusion = "BlendingMode.SATURATION";
         if (fusion.selection.index == 28) modeFusion = "BlendingMode.COLOR";
         if (fusion.selection.index == 29) modeFusion = "BlendingMode.LUMINOSITY";
         if (fusion.selection.index == 30) modeFusion = "BlendingMode.STENCIL_ALPHA";
         if (fusion.selection.index == 31) modeFusion = "BlendingMode.STENCIL_LUMA";
         if (fusion.selection.index == 32) modeFusion = "BlendingMode.SILHOUETE_ALPHA";
         if (fusion.selection.index == 33) modeFusion = "BlendingMode.SILHOUETTE_LUMA";
         if (fusion.selection.index == 34) modeFusion = "BlendingMode.ALPHA_ADD";
         if (fusion.selection.index == 35) modeFusion = "BlendingMode.LUMINESCENT_PREMUL";
         if (alpha.selection.index == 0) modeAlpha = "TrackMatteType.NO_TRACK_MATTE";
         if (alpha.selection.index == 1) modeAlpha = "TrackMatteType.ALPHA";
         if (alpha.selection.index == 2) modeAlpha = "TrackMatteType.ALPHA_INVERTED";
         if (alpha.selection.index == 3) modeAlpha = "TrackMatteType.LUMA";
         if (alpha.selection.index == 4) modeAlpha = "TrackMatteType.LUMA_INVERTED";
		var script = "//#layerAlpha \n" + 
        "for (i=0;i<app.project.activeItem.selectedLayers.length;i++) {\n" +
        "app.project.activeItem.selectedLayers[i].trackMatteType = " + modeAlpha + ";\n" + 
        "app.project.activeItem.selectedLayers[i].blendingMode = " + modeFusion + ";\n" + 
        "}\n\n";		
		//enregistrer le code dans un fichier temporaire
        var tmp = new File(Folder.startup.absoluteURI + "/Scripts/(Duac)/tmp.jsx");
		tmp.open("w");
		tmp.write(script);
		tmp.close();
        delete tmp;
        fenetre.hide();
            }
        
       
       fenetre.show();