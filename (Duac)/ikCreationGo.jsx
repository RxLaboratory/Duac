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


//FONCTION TRADUCTION
function traduction(Tableau) {
	if (app.settings.getSetting("duik", "lang") == Language.FRENCH) return Tableau[1];
	else if (app.settings.getSetting("duik", "lang") == Language.ENGLISH) return Tableau[0];
	else if (app.settings.getSetting("duik", "lang") == Language.SPANISH) return Tableau[2];
	else return Tableau[0];
	}



//FONCTION QUI APPLIQUE UN IK SUR UN SEUL BONE (LOOKAT)
function onebone(){

	//récupérer le bone
	var bonename = app.project.activeItem.selectedLayers[0].name;
	var bone = app.project.activeItem.selectedLayers[0];
	var origine = bone.transform.rotation.value;
	//récupérer le controleur
	var controleurname = app.project.activeItem.selectedLayers[1].name;
	var controleur = app.project.activeItem.selectedLayers[1];

				//  début de groupe d'annulation
				app.beginUndoGroup("LookAt " + bonename);

	//=========================================================
	//EXPRESSION A INSERER
	var expression = "C = thisComp.layer(\"" + controleurname + "\").toWorld(thisComp.layer(\"" + controleurname + "\").anchorPoint);" +
	"O =  thisLayer.toWorld(thisLayer.anchorPoint);" +
	"angle = lookAt(C,O);" +
	"angle[0] > 0 ? angle[0]+angle[1]+value : angle[0]-angle[1]+value;"
	//=========================================================

	bone.transform.rotation.expression = expression;

	//modifier la valeur pour éviter l'offset
	nouvelle = bone.transform.rotation.value;
	bone.transform.rotation.setValue(origine - nouvelle);
	
			//fin du groupe d'annulation			
			app.endUndoGroup();

}


//FONCTION QUI APPLIQUE UN IK SUR DEUX BONES
function twobones(tridi){

//récupérer le bone du bout
var boneboutname = app.project.activeItem.selectedLayers[0].name;
var bonebout = app.project.activeItem.selectedLayers[0];
//récupérer le bone racine
var boneracinename = app.project.activeItem.selectedLayers[1].name;
var boneracine = app.project.activeItem.selectedLayers[1];
//récupérer le controleur
var controleurname = app.project.activeItem.selectedLayers[2].name;
var controleur = app.project.activeItem.selectedLayers[2];

//vérifions que les parentées sont bonnes
	if (bonebout.parent == boneracine) {

//  début de groupe d'annulation
			app.beginUndoGroup("IK " + controleurname);
			
//Ajoutons une case a cocher sur le controleur pour choisir le sens de l'IK
coude = controleur.Effects.addProperty("ADBE Checkbox Control");
coude.name = "IK Orientation" + boneracinename.slice(-15);
if (tridi) {
	direction = controleur.Effects.addProperty("ADBE Angle Control");
	direction.name = "IK Direction " +  boneracinename.slice(-15);
	}
		
//créer un zéro
var zerobout = app.project.activeItem.layers.addNull();
zerobout.threeDLayer = true;
var controleurparent = controleur.parent;
controleur.parent = null;
zerobout.position.setValue(controleur.position.value);
zerobout.name = "IK_zero " + boneboutname.slice(-24);
controleur.parent = controleurparent;

//lier le zéro au bone du bout
zerobout.parent = bonebout;

//verrouiller et masquer le zéro
zerobout.moveToEnd();
zerobout.guideLayer = true;
zerobout.locked = true;
zerobout.enabled = false;
zerobout.shy = true;


//=========================================================
//EXPRESSION A INSERER SUR LE BONE BOUT
var expressionbout = "boneracine = \"" + boneracinename + "\";\n" + 
"bonebout = \"" + boneboutname + "\";\n" + 
"zero = \"" + "IK_zero " + boneboutname.slice(-24) + "\";\n" + 
"controleur = \"" + controleurname + "\";\n" + 
"if (thisComp.layer(controleur).effect(\"" + "IK Orientation" + boneracinename.slice(-15) + "\")(1) == 1) {cw = true}else{cw=false}\n" +
"function getWorldPos(theLayerName){\n" + 
"  L = thisComp.layer(theLayerName);\n" + 
"  return L.toWorld(L.anchorPoint);\n" + 
"}\n" + 
"function oriente(a, b, P) {\n" +
"return ((b[0]-a[0])*(P[1]-a[1]) - (P[0]-a[0])*(b[1]-a[1]) );\n" +
"}\n" +
"A = getWorldPos(boneracine);\n" + 
"B = getWorldPos(bonebout);\n" + 
"C = getWorldPos(zero);\n" + 
"E = getWorldPos(controleur);\n" + 
"a = length(B,C);\n" + 
"b = length(E,A);\n" + 
"c = length(A,B);\n" + 
"x = (b*b + c*c - a*a )/(2*b);\n" + 
"alpha = Math.acos(clamp(x/c,-1,1));\n" + 
"y = b - x;\n" + 
"  gamma = Math.acos(clamp(y/a,-1,1));\n" + 
"result = (cw ? 1 : -1)*radiansToDegrees(gamma + alpha);" +
"  V1 = B - A;\n" + 
"  adj1 = radiansToDegrees(Math.atan2(V1[1],V1[0]));\n" + 
"  V2 = C - B;\n" + 
"  adj2 = radiansToDegrees(Math.atan2(V2[1],V2[0]));\n" + 
"  result +  adj1 - adj2 + value;"
//=========================================================

tridi ? bonebout.transform.zRotation.expression = expressionbout : bonebout.transform.rotation.expression = expressionbout;

//=========================================================
//EXPRESSION A INSERER SUR LE BONE RACINE
var expressionracine = "boneracine = \"" + boneracinename + "\";\n" + 
"bonebout = \"" + boneboutname + "\";\n" + 
"zero = \"" + "IK_zero " + boneboutname.slice(-24) + "\";\n" + 
"controleur = \"" + controleurname + "\";\n" + 
"if (thisComp.layer(controleur).effect(\"" + "IK Orientation" + boneracinename.slice(-15) + "\")(1) == 1) {cw = true}else{cw=false}\n" +
"function getWorldPos(theLayerName){\n" + 
"  L = thisComp.layer(theLayerName);\n" + 
"  return L.toWorld(L.anchorPoint);\n" + 
"}\n" + 
"function oriente(a, b, P) {\n" +
"return ((b[0]-a[0])*(P[1]-a[1]) - (P[0]-a[0])*(b[1]-a[1]) );\n" +
"}\n" +
"A = getWorldPos(boneracine);\n" + 
"B = getWorldPos(bonebout);\n" + 
"C = getWorldPos(zero);\n" + 
"E = getWorldPos(controleur);\n" + 
"a = length(B,C);\n" + 
"b = length(E,A);\n" + 
"c = length(A,B);\n" + 
"x = (b*b + c*c - a*a )/(2*b);\n" + 
"alpha = Math.acos(clamp(x/c,-1,1));\n" + 
"D = E - A;\n" + 
"delta = Math.atan2(D[1],D[0]);\n" + 
"result = radiansToDegrees(delta - (cw ? 1 : -1)*alpha);\n" +
"V = B - A;\n" + 
"adj1 = radiansToDegrees(Math.atan2(V[1],V[0]));\n" + 
"result - adj1 + value;"
//=======================================================

tridi ? boneracine.transform.zRotation.expression = expressionracine : boneracine.transform.rotation.expression = expressionracine;

if (tridi) {
	//si 3D : le zéro de la jambe pour l'orientation
	//créer un zéro
	var zero = app.project.activeItem.layers.addNull();
	zero.threeDLayer = true;
	var calqueparent = boneracine.parent;
	boneracine.parent = null;
	zero.position.setValue(boneracine.position.value);
	zero.name = "Zero_" + boneracine.name.slice(-24);
	//verrouiller et masquer le zéro
	zero.moveToEnd();
	zero.guideLayer = true;
	zero.shy = true;


		var expressionzero = "controleur =thisComp.layer(\"" + controleurname + "\");\n\n" + 
		"C = controleur.toWorld(controleur.anchorPoint);\n" +
		"Cx = C[0];\n" +
		"Cy = C[1];\n" +
		"Cz = C[2];\n" +
		"L =  thisLayer.toWorld(thisLayer.anchorPoint);\n" +
		"Lx = L[0];\n" +
		"Ly = L[1];\n" +
		"Lz = L[2];" +
		"angle = lookAt([Cz,Cy,Cx],[Lz,Ly,Lx]);\n" +
		"[-angle[1]+90,-angle[0],value[2]]\n"
		zero.transform.orientation.expression = expressionzero;
		zero.transform.xRotation.expression = "thisComp.layer(\"" + controleurname + "\").effect(\"IK Direction " +  boneracinename.slice(-15) + "\")(1)";

		boneracine.parent = zero;
		//lier le zéro au bone du bout
		zero.parent = calqueparent;
		zero.enabled = false;
		zero.locked = true;


}


			//fin du groupe d'annulation
			
			app.endUndoGroup();
			
			
} else { alert(traduction(["First, select the bone of the end, second, the root, then the controller, in this exact order","Il faut bien sélectionner d'abord le bone du bout, puis celui de la racine, puis le contrôleur, dans cet ordre précis","Primero, selecciona el 'bone' final, después la 'raiz', y finalmente el controlador, en este orden exacto"]),"Attention",true); }

	}



//FONCTION QUI APPLIQUE UN IK SUR DEUX + UN BONES
function twoplusbones(tridi){

//récupérer la main
var mainname = app.project.activeItem.selectedLayers[0].name;
var main = app.project.activeItem.selectedLayers[0];
//récupérer le bone du bout
var boneboutname = app.project.activeItem.selectedLayers[1].name;
var bonebout = app.project.activeItem.selectedLayers[1];
//récupérer le bone racine
var boneracinename = app.project.activeItem.selectedLayers[2].name;
var boneracine = app.project.activeItem.selectedLayers[2];
//récupérer le controleur
var controleurname = app.project.activeItem.selectedLayers[3].name;
var controleur = app.project.activeItem.selectedLayers[3];

//vérifions que les parentées sont bonnes
	if (bonebout.parent == boneracine) { 
		if (main.parent == bonebout) {
			
			//  début de groupe d'annulation
			app.beginUndoGroup("IK " + controleurname);
			
			//une case a cocher pour choisir le sens de l'IK sur le controleur
			coude = controleur.Effects.addProperty("ADBE Checkbox Control");
			coude.name = "IK Orientation " + mainname.slice(-15);
			//un paramètre angle pour la direction en cas de 3D
			if (tridi) {
			direction = controleur.Effects.addProperty("ADBE Angle Control");
			direction.name = "IK Direction " + mainname.slice(-15);
			}
			
//=========================================================
//EXPRESSION A INSERER SUR LE BONE BOUT
var expressionBout = "boneracine = \"" + boneracinename + "\";\n" +
"bonebout = \"" + boneboutname + "\";\n" +
"zero = \"" + mainname + "\";\n"+
"controleur = \"" + controleurname + "\";\n"+
"if (thisComp.layer(controleur).effect(\"" + "IK Orientation " + mainname.slice(-15) + "\")(1) == 1) {cw = true}else{cw=false}\n"+
"function getWorldPos(theLayerName){\n"+
"  L = thisComp.layer(theLayerName);\n"+
"  return L.toWorld(L.anchorPoint);\n" + "}\n"+
"function oriente(a, b, P) {\n"+
"return ((b[0]-a[0])*(P[1]-a[1]) - (P[0]-a[0])*(b[1]-a[1]) );\n"+
"}\n" +"A = getWorldPos(boneracine);\n"+
"B = getWorldPos(bonebout);\n"+
"C = getWorldPos(zero);\n" +
"E = getWorldPos(controleur);\n"+
"a = length(B,C);\n"+
"b = length(E,A);\n" + "c = length(A,B);\n"+
"x = (b*b + c*c - a*a )/(2*b);\n"+
"alpha = Math.acos(clamp(x/c,-1,1));\n"+
"y = b - x;\n"+
"  gamma = Math.acos(clamp(y/a,-1,1));\n"+
"result = (cw ? 1 : -1)*radiansToDegrees(gamma + alpha);"+
"  V1 = B - A;\n" +
"  adj1 = radiansToDegrees(Math.atan2(V1[1],V1[0]));\n"+
"  V2 = C - B;\n"+
"  adj2 = radiansToDegrees(Math.atan2(V2[1],V2[0]));\n" +
"  result +  adj1 - adj2 + value;"
//=========================================================

tridi ? bonebout.transform.zRotation.expression = expressionBout : bonebout.transform.rotation.expression = expressionBout;

//=========================================================
//EXPRESSION A INSERER SUR LE BONE RACINE
var expressionracine = "boneracine = \"" + boneracinename + "\";\n" + 
"bonebout = \"" + boneboutname + "\";\n" + 
"zero = \"" + mainname + "\";\n" + 
"controleur = \"" + controleurname + "\";\n" + 
"if (thisComp.layer(controleur).effect(\"" + "IK Orientation " + mainname.slice(-15) + "\")(1) == 1) {cw = true}else{cw=false}\n" +
"function getWorldPos(theLayerName){\n" + 
"  L = thisComp.layer(theLayerName);\n" + 
"  return L.toWorld(L.anchorPoint);\n" + 
"}\n" + 
"function oriente(a, b, P) {\n" +
"return ((b[0]-a[0])*(P[1]-a[1]) - (P[0]-a[0])*(b[1]-a[1]) );\n" +
"}\n" +
"A = getWorldPos(boneracine);\n" + 
"B = getWorldPos(bonebout);\n" + 
"C = getWorldPos(zero);\n" + 
"E = getWorldPos(controleur);\n" + 
"a = length(B,C);\n" + 
"b = length(E,A);\n" + 
"c = length(A,B);\n" + 
"x = (b*b + c*c - a*a )/(2*b);\n" + 
"alpha = Math.acos(clamp(x/c,-1,1));\n" + 
"D = E - A;\n" + 
"delta = Math.atan2(D[1],D[0]);\n" + 
"result = radiansToDegrees(delta - (cw ? 1 : -1)*alpha);\n" +
"V = B - A;\n" + 
"adj1 = radiansToDegrees(Math.atan2(V[1],V[0]));\n" + 
"result - adj1 + value;"
//=======================================================

tridi ? boneracine.transform.zRotation.expression = expressionracine : boneracine.transform.rotation.expression = expressionracine;

if (tridi) {
	main.transform.xRotation.expression = "value + thisComp.layer(\"" + controleurname + "\").transform.xRotation";
	main.transform.yRotation.expression = "value + thisComp.layer(\"" + controleurname + "\").transform.yRotation";
	main.transform.zRotation.expression = "value + thisComp.layer(\"" + controleurname + "\").transform.zRotation";
	main.transform.orientation.expression = "value + thisComp.layer(\"" + controleurname + "\").transform.orientation";
	} else {
	main.transform.rotation.expression = "value + thisComp.layer(\"" + controleurname + "\").transform.rotation";
	}

if (tridi) {
	//si 3D : le zéro de la jambe pour l'orientation
	//créer un zéro
	var zero = app.project.activeItem.layers.addNull();
	zero.threeDLayer = true;
	var calqueparent = boneracine.parent;
	boneracine.parent = null;
	zero.position.setValue(boneracine.position.value);
	zero.name = "Zero_" + boneracine.name.slice(-24);
	//verrouiller et masquer le zéro
	zero.moveToEnd();
	zero.guideLayer = true;
	zero.shy = true;


		var expressionzero = "controleur =thisComp.layer(\"" + controleurname + "\");\n\n" + 
		"C = controleur.toWorld(controleur.anchorPoint);\n" +
		"Cx = C[0];\n" +
		"Cy = C[1];\n" +
		"Cz = C[2];\n" +
		"L =  thisLayer.toWorld(thisLayer.anchorPoint);\n" +
		"Lx = L[0];\n" +
		"Ly = L[1];\n" +
		"Lz = L[2];" +
		"angle = lookAt([Cz,Cy,Cx],[Lz,Ly,Lx]);\n" +
		"[-angle[1]+90,-angle[0],value[2]]\n"
		zero.transform.orientation.expression = expressionzero;
		zero.transform.xRotation.expression = "thisComp.layer(\"" + controleurname + "\").effect(\"IK Direction " + mainname.slice(-15) + "\")(1)";

		boneracine.parent = zero;
		//lier le zéro au bone du bout
		zero.parent = calqueparent;
		zero.enabled = false;
		zero.locked = true;

	//IK Goal
	//dupliquer le Layer
	var goal = main.duplicate();
	goal.name = main.name + " goal";
	goal.parent = null;
	goal.transform.position.expression = "thisComp.layer(\"" + mainname + "\").toWorld(thisComp.layer(\"" + mainname + "\").anchorPoint)";
	layer.enabled = false;

}
			//fin du groupe d'annulation
			app.endUndoGroup();

			
} else { alert(traduction(["First, select the bone of the end, second, the root, then the controller, in this exact order","Il faut bien sélectionner d'abord le bone du bout, puis celui de la racine, puis le contrôleur, dans cet ordre précis","Primero, selecciona el 'bone' final, después la 'raiz', y finalmente el controlador, en este orden exacto"]),"Attention",true); }
} else { alert(traduction(["First, select the bone of the end, second, the root, then the controller, in this exact order","Il faut bien sélectionner d'abord le bone du bout, puis celui de la racine, puis le contrôleur, dans cet ordre précis","Primero, selecciona el 'bone' final, después la 'raiz', y finalmente el controlador, en este orden exacto"]),"Attention",true); }

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
		var calques = app.project.activeItem.selectedLayers;
	if (calques.length == 2 || calques.length == 3 || calques.length == 4) {
		var calquetridi = false;
		var ncalquetridi = 0;
	for (i=0;i<calques.length;i++){
		if (calques[i].threeDLayer) {ncalquetridi = i+1;}
		}
	if (ncalquetridi == 0 || ncalquetridi == calques.length) {
	if (ncalquetridi == calques.length) calquetridi = true;
	if (calques.length == 2) { calquetridi ? alert(traduction(["IK on one bone (LookAt) is not available on 3D Layers (yet)","Les IK sur un seul bone (LookAt) ne sont pas (encore) possible sur les calques 3D","IK on one bone (LookAt) is not available on 3D Layers (yet)"])) : onebone();}
	if (calques.length == 3) {twobones(calquetridi);}
	if (calques.length == 4) {twoplusbones(calquetridi);}
	} else {alert(traduction(["Make sure ALL the layers are 3D Layers or 2D layers, not both","Vérifiez que TOUS les calques soient 2D ou 3D, pas les deux","Make sure ALL the layers are 3D Layers or 2D layers, not both"]));}
	} else{alert(traduction(["Select the bones and the controller before creating IK","Veuillez sélectionner les bones et le contrôleur avant de créer un IK","Selecciona los 'bones' y el controlador antes de crear un 'IK'"]));}
	} else{alert(traduction(["Make sure there are no layers that share the same name!","Vérifiez qu'il n'y a pas deux calques portant le même nom !","Make sure there are no layers that share the same name!"]));}
