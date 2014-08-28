
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
	layer3DOrientation : tourne le layer sélectionné

	*/

        //fichier temporaire d'échange entre scripts
        var tmp = new File(Folder.startup.absoluteURI + "/Scripts/(Duac)/tmp.jsx");
		tmp.open("w");
		tmp.write("#");
		tmp.close();

        var fenetre = new Window("dialog","Transformations Calque");
        fenetre.bounds = [300,300,600,362];

       var orientation = fenetre.add("radiobutton",[2,2,100,20],"Orientation :");
        var rotation = fenetre.add("radiobutton",[2,22,100,40],"");
        rotation.value = true;
        var orX = fenetre.add("edittext",[102,2,166,20],"0");
        var orY = fenetre.add("edittext",[168,2,233,20],"0");
        var orZ = fenetre.add("edittext",[233,2,298,20],"0");
        var rotX = fenetre.add("edittext",[122,22,166,40],"0");
        var rotXs = fenetre.add("edittext",[102,22,120,40],"+");
        var rotY = fenetre.add("edittext",[188,22,233,40],"0");
        var rotYs = fenetre.add("edittext",[168,22,186,40],"+"); 
        var rotZ = fenetre.add("edittext",[256,22,298,40],"0");
        var rotZs = fenetre.add("edittext",[233,22,254,40],"+");
        orX.enabled = false;
        orY.enabled = false;
        orZ.enabled = false;
        orientation.onClick = function () {
            orX.enabled = orientation.value;
            orY.enabled = orientation.value;
            orZ.enabled = orientation.value;
            rotX.enabled = !orientation.value;
            rotXs.enabled = !orientation.value;
            rotY.enabled = !orientation.value;
            rotYs.enabled = !orientation.value;
            rotZ.enabled = !orientation.value;
            rotZs.enabled = !orientation.value;
            };
                rotation.onClick = function () {
            orX.enabled = !rotation.value;
            orY.enabled = !rotation.value;
            orZ.enabled = !rotation.value;
            rotX.enabled = rotation.value;
            rotXs.enabled = rotation.value;
            rotY.enabled = rotation.value;
            rotYs.enabled = rotation.value;
            rotZ.enabled = rotation.value;
            rotZs.enabled = rotation.value;
            };

        
        //bouton ok construire le code
		var ok = fenetre.add("button",[256,42,298,60],"OK");
        
		ok.onClick = function () {
        //le code
        if (!rotation.value) {
		var script = "//#layer3DOrientation \n" +
        "for (i=0;i<app.project.activeItem.selectedLayers.length;i++) {\n" +
        "app.project.activeItem.selectedLayers[i].transform.orientation.setValue([" + orX.text + "," + orY.text + "," + orZ.text + "]);\n" + 
        "}\n\n";
        }
        else {
         var script = "//#layer3DOrientation \n" +
        "for (i=0;i<app.project.activeItem.selectedLayers.length;i++) {\n" +
        "app.project.activeItem.selectedLayers[i].transform.orientation.setValue(app.project.activeItem.selectedLayers[i].transform.orientation.value + [" + rotXs.text + rotX.text + "," + rotYs.text + rotY.text + "," + rotZs.text + rotZ.text  + "]);\n" + 
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