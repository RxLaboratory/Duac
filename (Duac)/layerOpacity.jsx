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
	layerOpacity : Opacité du calque

	*/

        //fichier temporaire d'échange entre scripts
        var tmp = new File(Folder.startup.absoluteURI + "/Scripts/(Duac)/tmp.jsx");
		tmp.open("w");
		tmp.write("#");
		tmp.close();

        var fenetre = new Window("dialog","Transformations Calque");
        fenetre.bounds = [300,300,468,362];

        var opacite = fenetre.add("radiobutton",[2,2,100,20],"Opacité :");
        var transparence = fenetre.add("radiobutton",[2,22,100,40],"");
        transparence.value = true;
        var opa = fenetre.add("edittext",[102,2,166,20],"100");
        var trans = fenetre.add("edittext",[122,22,166,40],"0");
        var transs = fenetre.add("edittext",[102,22,120,40],"+");
        opa.enabled = false;
                opacite.onClick = function () {
            opa.enabled = opacite.value;
            trans.enabled = !opacite.value;
            transs.enabled = !opacite.value;
            };
            transparence.onClick = function () {
            opa.enabled = !transparence.value;
            trans.enabled = transparence.value;
            transs.enabled = transparence.value;
            };
        
       
        //bouton ok construire le code
		var ok = fenetre.add("button",[102,42,166,60],"OK");
        
		ok.onClick = function () {
        //le code
        if (transparence.value) {
		var script = "//#layerOpacity \n" +
        "for (i=0;i<app.project.activeItem.selectedLayers.length;i++) {\n" +
        "app.project.activeItem.selectedLayers[i].transform.opacity.setValue(app.project.activeItem.selectedLayers[i].transform.opacity.value " + transs.text + trans.text + ");\n" + 
        "}\n\n";
        }
        else {
         var script = "//#layerOpacity \n" +
        "for (i=0;i<app.project.activeItem.selectedLayers.length;i++) {\n" +
        "app.project.activeItem.selectedLayers[i].transform.opacity.setValue(" + opa.text + ");\n" + 
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