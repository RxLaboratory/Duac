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
	layerRotation : tourne le layer sélectionné

	*/

        //fichier temporaire d'échange entre scripts
        var tmp = new File(Folder.startup.absoluteURI + "/Scripts/(Duac)/tmp.jsx");
		tmp.open("w");
		tmp.write("#");
		tmp.close();

        var fenetre = new Window("dialog","Transformations Calque");
        fenetre.bounds = [300,300,468,362];

       var orientation = fenetre.add("radiobutton",[2,2,100,20],"Rotation :");
        var rotation = fenetre.add("radiobutton",[2,22,100,40],"");
        rotation.value = true;
        var or = fenetre.add("edittext",[102,2,166,20],"0");
        var rot = fenetre.add("edittext",[122,22,166,40],"0");
        var rots = fenetre.add("edittext",[102,22,120,40],"+");
        or.enabled = false;
        orientation.onClick = function () {
            or.enabled = orientation.value;
            rot.enabled = !orientation.value;
            rots.enabled = !orientation.value;
            };
                rotation.onClick = function () {
            or.enabled = !rotation.value;
            rot.enabled = rotation.value;
            rots.enabled = rotation.value;

            };

        
        //bouton ok construire le code
		var ok = fenetre.add("button",[122,42,166,60],"OK");
        
		ok.onClick = function () {
        //le code
        if (!rotation.value) {
		var script = "//#layerRotation \n" +
        "for (i=0;i<app.project.activeItem.selectedLayers.length;i++) {\n" +
        "app.project.activeItem.selectedLayers[i].transform.rotation.setValue(" + or.text + ");\n" + 
        "}\n\n";
        }
        else {
         var script = "//#layerRotation \n" +
        "for (i=0;i<app.project.activeItem.selectedLayers.length;i++) {\n" +
        "app.project.activeItem.selectedLayers[i].transform.rotation.setValue(app.project.activeItem.selectedLayers[i].transform.rotation.value " + rots.text + rot.text + ");\n" + 
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