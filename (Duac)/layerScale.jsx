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
	layerScale : scale le layer sélectionné

	*/

        //fichier temporaire d'échange entre scripts
        var tmp = new File(Folder.startup.absoluteURI + "/Scripts/(Duac)/tmp.jsx");
		tmp.open("w");
		tmp.write("#");
		tmp.close();

        var fenetre = new Window("dialog","Transformations Calque");
        fenetre.bounds = [300,300,600,362];

         var echelle = fenetre.add("radiobutton",[2,2,100,20],"Echelle :");
        var agrandir = fenetre.add("radiobutton",[2,22,100,40],"");
        agrandir.value = true;
        var scX = fenetre.add("edittext",[102,2,166,20],"100");
        var scY = fenetre.add("edittext",[168,2,233,20],"100");
        var scZ = fenetre.add("edittext",[233,2,298,20],"100");
        var scaX = fenetre.add("edittext",[122,22,166,40],"0");
        var scaXs = fenetre.add("edittext",[102,22,120,40],"+");
        var scaY = fenetre.add("edittext",[188,22,233,40],"0");
        var scaYs = fenetre.add("edittext",[168,22,186,40],"+"); 
        var scaZ = fenetre.add("edittext",[256,22,298,40],"0");
        var scaZs = fenetre.add("edittext",[233,22,254,40],"+");
        scX.enabled = false;
        scY.enabled = false;
        scZ.enabled = false;
        echelle.onClick = function () {
            scX.enabled = echelle.value;
            scY.enabled = echelle.value;
            scZ.enabled = echelle.value;
            scaX.enabled = !echelle.value;
            scaXs.enabled = !echelle.value;
            scaY.enabled = !echelle.value;
            scaYs.enabled = !echelle.value;
            scaZ.enabled = !echelle.value;
            scaZs.enabled = !echelle.value;
            };
                agrandir.onClick = function () {
            scX.enabled = !agrandir.value;
            scY.enabled = !agrandir.value;
            scZ.enabled = !agrandir.value;
            scaX.enabled = agrandir.value;
            scaXs.enabled = agrandir.value;
            scaY.enabled = agrandir.value;
            scaYs.enabled = agrandir.value;
            scaZ.enabled = agrandir.value;
            scaZs.enabled = agrandir.value;
            };
        
        

 
        //bouton ok construire le code
		var ok = fenetre.add("button",[256,42,298,60],"OK");
        
		ok.onClick = function () {
        //le code
        if (!agrandir.value) {
		var script = "//#layerScale \n" +
        "for (i=0;i<app.project.activeItem.selectedLayers.length;i++) {\n" +
        "app.project.activeItem.selectedLayers[i].transform.scale.setValue([" + scX.text + "," + scY.text + "," + scZ.text + "]);\n" + 
        "}\n\n";
        }
        else {
         var script = "//#layerScale \n" +
        "for (i=0;i<app.project.activeItem.selectedLayers.length;i++) {\n" +
        "app.project.activeItem.selectedLayers[i].transform.scale.setValue(app.project.activeItem.selectedLayers[i].transform.scale.value + [" + scaXs.text + scaX.text + "," + scaYs.text + scaY.text + "," + scaZs.text + scaZ.text  + "]);\n" + 
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