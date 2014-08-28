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
	// Vérifions si il n'y a qu'un calque sélectionné
if (app.project.activeItem.selectedLayers.length == 1){

		//  début de groupe d'annulation
		app.beginUndoGroup("Bone");

//le calque sélectionné
var calque = app.project.activeItem.selectedLayers[0] ;
// les effets sélectionnés
var coins = app.project.activeItem.selectedLayers[0].selectedProperties ;

var okaytogo = false;

// vérifions si c'est la position ou le coin qui est sélectionné
if (coins.length == 4){
	
	var coinpos = coins.pop();
	var coin = coins.pop();
	if (coinpos instanceof Property && coinpos.value instanceof Array && coinpos.value.length ==2){okaytogo = true;}

}else{
	
		if (coins.length == 3){
			
		var coin = coins.pop();
		var coinpos = coin.position;
		if (coinpos instanceof Property && coinpos.value instanceof Array && coinpos.value.length ==2){okaytogo = true;}
		}

}
	

if (okaytogo){
//la position du coin
var position = coinpos.value;
//créer le bone
var bone = app.project.activeItem.layers.addSolid([1,0,0],"B_" + coin.name,20,20,1);
//mettre le bone à cette position
bone.position.setValue(position);
//nom du bone
bone.name = "B_" + coin.name;
bone.guideLayer = true;
//mettre l'expression dans le coin
coinpos.expression = "thisComp.layer(\"" + bone.name + "\").toWorld(thisComp.layer(\"" + bone.name + "\").anchorPoint)";

} else {alert(traduction(["Select a corner to create a bone","veuillez sélectionner le coin où créer un Bone","Selecciona un corner para crear un 'bone'"]),"Attention");}
	
//fin du groupe d'annulation
app.endUndoGroup();


}else{alert(traduction(["Select a corner to create a bone","veuillez sélectionner le coin où créer un Bone","Selecciona un corner para crear un 'bone'"]),"Attention");}
} else{alert(traduction(["Make sure there are no layers that share the same name!","Vérifiez qu'il n'y a pas deux calques portant le même nom !","Make sure there are no layers that share the same name!"]));}


