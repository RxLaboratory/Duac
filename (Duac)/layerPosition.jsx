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
	layerPosition : déplace le layer sélectionné

	*/

        //fichier temporaire d'échange entre scripts
        var tmp = new File(Folder.startup.absoluteURI + "/Scripts/(Duac)/tmp.jsx");
		tmp.open("w");
		tmp.write("#");
		tmp.close();

        var fenetre = new Window("dialog","Transformations Calque");
        fenetre.bounds = [300,300,600,362];
        var position = fenetre.add("radiobutton",[2,2,100,20],"Position :");
        var translation = fenetre.add("radiobutton",[2,22,100,40],"");
        translation.value = true;
        var posX = fenetre.add("edittext",[102,2,166,20],"0");
        var posY = fenetre.add("edittext",[168,2,233,20],"0");
        var posZ = fenetre.add("edittext",[233,2,298,20],"0");
        var transX = fenetre.add("edittext",[122,22,166,40],"0");
        var transXs = fenetre.add("edittext",[102,22,120,40],"+");
        var transY = fenetre.add("edittext",[188,22,233,40],"0");
        var transYs = fenetre.add("edittext",[168,22,186,40],"+"); 
        var transZ = fenetre.add("edittext",[256,22,298,40],"0");
        var transZs = fenetre.add("edittext",[233,22,254,40],"+");
        posX.enabled = false;
        posY.enabled = false;
        posZ.enabled = false;
        position.onClick = function () {
            posX.enabled = position.value;
            posY.enabled = position.value;
            posZ.enabled = position.value;
            transX.enabled = !position.value;
            transXs.enabled = !position.value;
            transY.enabled = !position.value;
            transYs.enabled = !position.value;
            transZ.enabled = !position.value;
            transZs.enabled = !position.value;
            };
                translation.onClick = function () {
            posX.enabled = !translation.value;
            posY.enabled = !translation.value;
            posZ.enabled = !translation.value;
            transX.enabled = translation.value;
            transXs.enabled = translation.value;
            transY.enabled = translation.value;
            transYs.enabled = translation.value;
            transZ.enabled = translation.value;
            transZs.enabled = translation.value;
            };
        
 
        
        //bouton ok construire le code
		var ok = fenetre.add("button",[256,42,298,60],"OK");
        
		ok.onClick = function () {
        //le code
        if (!translation.value) {
		var script = "//#layerPosition \n" +
        "for (i=0;i<app.project.activeItem.selectedLayers.length;i++) {\n" +
        "app.project.activeItem.selectedLayers[i].transform.position.setValue([" + posX.text + "," + posY.text + "," + posZ.text + "]);\n" + 
        "}\n\n";
        }
        else {
         var script = "//#layerPosition \n" +
        "for (i=0;i<app.project.activeItem.selectedLayers.length;i++) {\n" +
        "app.project.activeItem.selectedLayers[i].transform.position.setValue(app.project.activeItem.selectedLayers[i].transform.position.value + [" + transXs.text + transX.text + "," + transYs.text + transY.text + "," + transZs.text + transZ.text  + "]);\n" + 
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