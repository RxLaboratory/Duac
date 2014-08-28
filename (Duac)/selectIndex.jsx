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
	selectIndex : Sélecte un calque par son index


	*/

        //fichier temporaire d'échange entre scripts
        var tmp = new File(Folder.startup.absoluteURI + "/Scripts/(Duac)/tmp.jsx");
		tmp.open("w");
		tmp.write("#");
		tmp.close();
        
        var fenetre = new Window("dialog","Sélection par index");
        fenetre.bounds = [300,300,468,342];

        fenetre.add("statictext",[2,2,100,20],"Index :");
        var indexCalque = fenetre.add("edittext",[102,2,166,20],"1");
        
        //bouton ok construire le code
		var ok = fenetre.add("button",[102,22,166,40],"OK");
        
		ok.onClick = function () {        
        //le code
		var script = "//#selectIndex \n" + 
        "app.project.activeItem.layer(" + indexCalque.text + ").selected = true;\n\n";


		//enregistrer le code dans un fichier temporaire
        var tmp = new File(Folder.startup.absoluteURI + "/Scripts/(Duac)/tmp.jsx");
		tmp.open("w");
		tmp.write(script);
		tmp.close();
        delete tmp;
        fenetre.hide();	
            }
        
        
        fenetre.show();