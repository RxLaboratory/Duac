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



/*
This file is also part of Duik - DuDuF IK Tools for After Effects
Copyright (c) 2008, 2009, 2010 Nicolas Dufresne
http://www.duduf.net

*/


function traduction(Tableau) {
	if (app.settings.getSetting("duik", "lang") == Language.FRENCH) return Tableau[1];
	else if (app.settings.getSetting("duik", "lang") == Language.ENGLISH) return Tableau[0];
	else if (app.settings.getSetting("duik", "lang") == Language.SPANISH) return Tableau[2];
	else return Tableau[0];
	}


//FONCTION POUR VERIFIER QU'IL NYA PAS DEUX CALQUES PORTANT LE MEME NOM DANS LA COMP
function verifNoms() {
	
var calques = app.project.activeItem.layers;
var nbrecalques = app.project.activeItem.numLayers;
var okayToGo = true;


	if (nbrecalques > 1){
				for (i=1; i<=nbrecalques; i++) {
					for(j=i+1;j<=nbrecalques;j++){
						if(calques[i].name == calques[j].name) {okayToGo = false;}
						}
					}
	}
			return okayToGo;
}



	
	if (verifNoms()) {
 

	 
	 	//  début de groupe d'annulation
		app.beginUndoGroup("Controleur " + app.project.activeItem.selectedLayers[0].name);
		
		//le calque où placer le contrôleur et sa postion
		var bone = app.project.activeItem.selectedLayers[0];



		var boneparent = bone.parent;
		bone.parent = null;
		var boneposition = bone.transform.position.value;
		bone.parent = boneparent;

	
		//le controleur
		var controleur = app.project.activeItem.layers.addNull();
		controleur.transform.position.setValue(boneposition);
		controleur.name = "C_" + bone.name.slice(-28);
		
		//fin du groupe d'annulation
		app.endUndoGroup();

	 	} else{alert(traduction(["Make sure there are no layers that share the same name!","Vérifiez qu'il n'y a pas deux calques portant le même nom !","Make sure there are no layers that share the same name!"]));}

