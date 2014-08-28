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
	layerRename : Ajouter un null

	*/
		//enregistrer le code dans un fichier temporaire
        var tmp = new File(Folder.startup.absoluteURI + "/Scripts/(Duac)/tmp.jsx");
		tmp.open("w");
		tmp.write("#");
		tmp.close();
        delete tmp;
        
        
            // la fenetre du rename
		var fenetrerename = new Window("dialog","Renommer");
		fenetrerename.bounds = [300,300,600,435];
		//prefix
		var prefixtexte = fenetrerename.add("checkbox",[5,5,60,25],"Préfixe");
		var prefix = fenetrerename.add("edittext",[65,5,295,25]);
		prefix.enabled = false;
		prefixtexte.onClick = function() {
			prefixtexte.value ? prefix.enabled = true : prefix.enabled = false ;
			}
		//nom
		var nametexte = fenetrerename.add("checkbox",[5,30,60,50],"Nom","Name");
		var name = fenetrerename.add("edittext",[65,30,295,50]);
		name.enabled = false;
			nametexte.onClick = function() {
			nametexte.value ? name.enabled = true : name.enabled = false ;
			}
		//suffix
		var suffixtexte = fenetrerename.add("checkbox",[5,55,60,75],"Suffixe");
		var suffix = fenetrerename.add("edittext",[65,55,295,75]);
		suffix.enabled = false;
			suffixtexte.onClick = function() {
			suffixtexte.value ? suffix.enabled = true : suffix.enabled = false ;
			}
		//numéros
		var numerotexte = fenetrerename.add("checkbox",[5,80,200,100],"Numéroter à partir de :");
		var numero = fenetrerename.add("edittext",[205,80,295,100]);
		numero.enabled = false;
			numerotexte.onClick = function() {
			numerotexte.value ? numero.enabled = true : numero.enabled = false ;
			}
		//ok
		var renameok = fenetrerename.add("button",[5,105,295,125],"OK");
		renameok.onClick = function (){

        var prefixe = "";
		prefixtexte.value ? prefixe = prefix.text : prefixe = "";
		var nom = "";
		nametexte.value ? nom = name.text : nom = "";
		var suffixe = "";
		suffixtexte.value ? suffixe = suffix.text : suffixe = "";

		if (!numerotexte.value){
			var script =  "//#layerRename \n" + 
			"for (i=0;i<app.project.activeItem.selectedLayers.length;i++) {\n" +
			"app.project.activeItem.selectedLayers[i].name = '" + prefixe + nom + suffixe + "';\n" +
			"}\n\n";
		} else {
			var script =  "//#layerRename \n" + 
			"for (i=0;i<app.project.activeItem.selectedLayers.length;i++) {\n" +
			"var numbering = " + numero.text + " + i;\n" +
			"app.project.activeItem.selectedLayers[i].name = '" + prefixe + nom + suffixe + "' + numbering;\n" +
			"}\n\n";	
			}
			
		//enregistrer le code dans un fichier temporaire
        var tmp = new File(Folder.startup.absoluteURI + "/Scripts/(Duac)/tmp.jsx");
		tmp.open("w");
		tmp.write(script);
		tmp.close();
        delete tmp;
        fenetrerename.hide();
        }
    fenetrerename.show();