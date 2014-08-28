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
	layerParent : Définit le parent d'un calque


	*/

        //fichier temporaire d'échange entre scripts
        var tmp = new File(Folder.startup.absoluteURI + "/Scripts/(Duac)/tmp.jsx");
		tmp.open("w");
		tmp.write("#");
		tmp.close();
        
        var fenetre = new Window("dialog","Sélection par nom");
        fenetre.bounds = [300,300,700,362];

        var exact = fenetre.add("radiobutton",[2,2,100,20],"Nom exact :");
		var index = fenetre.add("radiobutton",[2,22,100,40],"Index :");
        var nomCalque = fenetre.add("edittext",[102,2,398,20],"");
        nomCalque.enabled = true;
		exact.value = true;
		var indexCalque = fenetre.add("edittext",[102,22,398,40],"1");
		indexCalque.enabled = false;
        exact.onClick = function () {
            nomCalque.enabled = exact.value;
			indexCalque.enabled = index.value;
			}
		 index.onClick = function () {
            nomCalque.enabled = exact.value;
			indexCalque.enabled = index.value;
            }
        
        //bouton ok construire le code
		var ok = fenetre.add("button",[102,42,166,60],"OK");
        
		ok.onClick = function () {        
        
            if(exact.value) {
        //le code
		var script = "//#layerParent \n" + 
        "for (i=0;i<app.project.activeItem.selectedLayers.length;i++) {\n" +
        "app.project.activeItem.selectedLayers[i].parent = app.project.activeItem.layer('" + nomCalque.text + "');\n" +
        "}\n\n";
        }
	 if(index.value) {
		var script = "//#layerParent \n" + 
        "for (i=0;i<app.project.activeItem.selectedLayers.length;i++) {\n" +
        "app.project.activeItem.selectedLayers[i].parent = app.project.activeItem.layer(" + indexCalque.text + ");\n" +
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