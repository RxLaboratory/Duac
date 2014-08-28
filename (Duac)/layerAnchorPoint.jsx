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
	layerAnchorPoint : point d'ancrage le layer sélectionné

	*/

        //fichier temporaire d'échange entre scripts
        var tmp = new File(Folder.startup.absoluteURI + "/Scripts/(Duac)/tmp.jsx");
		tmp.open("w");
		tmp.write("#");
		tmp.close();

        var fenetre = new Window("dialog","Transformations Calque");
        fenetre.bounds = [300,300,600,362];

                 var ancrage = fenetre.add("radiobutton",[2,2,100,20],"Point d'ancrage :");
        var deplacement = fenetre.add("radiobutton",[2,22,100,40],"");
        deplacement.value = true;
        var apX = fenetre.add("edittext",[102,2,166,20],"0");
        var apY = fenetre.add("edittext",[168,2,233,20],"0");
        var apZ = fenetre.add("edittext",[233,2,298,20],"0");
        var depX = fenetre.add("edittext",[122,22,166,40],"0");
        var depXs = fenetre.add("edittext",[102,22,120,40],"+");
        var depY = fenetre.add("edittext",[188,22,233,40],"0");
        var depYs = fenetre.add("edittext",[168,22,186,40],"+"); 
        var depZ = fenetre.add("edittext",[256,22,298,40],"0");
        var depZs = fenetre.add("edittext",[233,22,254,40],"+");
        apX.enabled = false;
        apY.enabled = false;
        apZ.enabled = false;
        ancrage.onClick = function () {
            apX.enabled = ancrage.value;
            apY.enabled = ancrage.value;
            apZ.enabled = ancrage.value;
            depX.enabled = !ancrage.value;
            depXs.enabled = !ancrage.value;
            depY.enabled = !ancrage.value;
            depYs.enabled = !ancrage.value;
            depZ.enabled = !ancrage.value;
            depZs.enabled = !ancrage.value;
            };
            deplacement.onClick = function () {
            apX.enabled = !deplacement.value;
            apY.enabled = !deplacement.value;
            apZ.enabled = !deplacement.value;
            depX.enabled = deplacement.value;
            depXs.enabled = deplacement.value;
            depY.enabled = deplacement.value;
            depYs.enabled = deplacement.value;
            depZ.enabled = deplacement.value;
            depZs.enabled = deplacement.value;
            };
        
        

        //bouton ok construire le code
		var ok = fenetre.add("button",[256,42,298,60],"OK");
        
		ok.onClick = function () {
        //le code
        if (!deplacement.value) {
		var script = "//#layerAnchorPoint \n" +
        "for (i=0;i<app.project.activeItem.selectedLayers.length;i++) {\n" +
        "app.project.activeItem.selectedLayers[i].transform.anchorPoint.setValue([" + apX.text + "," + apY.text + "," + apZ.text + "]);\n" + 
        "}\n\n";
        }
        else {
         var script = "//#layerAnchorPoint \n" +
        "for (i=0;i<app.project.activeItem.selectedLayers.length;i++) {\n" +
        "app.project.activeItem.selectedLayers[i].transform.anchorPoint.setValue(app.project.activeItem.selectedLayers[i].transform.anchorPoint.value + [" + depXs.text + depX.text + "," + depYs.text + depY.text + "," + depZs.text + depZ.text  + "]);\n" + 
        "}\n\n";
        }
		//enregistrer le code dans un fichier temporaire
        var tmp = new File(Folder.startup.absoluteURI + "/Scripts/(Duac)/tmp.jsx");
		tmp.open("w");
		tmp.write(script);
		tmp.close();
        delete tmp;
        fenetre.hide();	
            }
        
        
        fenetre.show();