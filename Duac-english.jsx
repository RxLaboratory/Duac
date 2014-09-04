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
	
	//================
	var version = "1.1";
	//================
    
           //dossier Duac
		var dossier = Folder.startup.absoluteURI  + "/Scripts/(Duac)/" ;
        //dossier des scripts persos
        if (! app.settings.haveSetting("duac", "user")){app.settings.saveSetting("duac","user",dossier + "User/");}
        var userFolder = new Folder(app.settings.getSetting("duac", "user"));

        //code en cours de création / charger l'autosave
		var autoSave = new File(dossier + "autosave.jsx");
		autoSave.open("r");
		var code = autoSave.read();
		autoSave.close();
		delete autoSave;
		if (code == "") code = "/*0.1\nScript created with Duduf Actions for After Effects version " + version + "\nhttp://www.duduf.net\n*/\n\n\n" ;
        //fichier temporaire d'échange entre scripts
        var tmp = new File(dossier + "tmp.jsx");
		tmp.open("w");
		tmp.write("#");
		tmp.close();
        delete tmp;


function Duac(thisObj){

//===================
//FONCTIONS
//===================

function actionDel() {

    //retirer le bout de code correspondant
    var index1 = 0;
    var index2 = 0;
    for(i=0;i<=listeActions.selection.index;i++) {
        index1 = code.indexOf("//#",index2);
        index2 = code.indexOf("//#",index1+1);
        }
    index2 == -1 ? code = code.substring(0,index1) : code = code.substring(0,index1) + code.substring(index2);
    
	refreshActions();
	
    }

function actionUp() {
    
    var element = listeActions.selection.index;
    
    //remonter le bout de code correspondant
    var index1 = 0;
    var index2 = 0;
    var indexB = 0;
    for(i=0;i<=element;i++) {
        index1 = code.indexOf("//#",index2);
        index2 = code.indexOf("//#",index1+1);
        indexB = code.lastIndexOf("//#",index1-1);
        }
    if (indexB != -1) {
        if  (index2 == -1) 
        code = code.substring(0,indexB) + code.substring(index1) + code.substring(indexB,index1) ;
        else
		code = code.substring(0,indexB) + code.substring(index1,index2) + code.substring(indexB,index1) + code.substring(index2);

		refreshActions();
        listeActions.selection = element-1;
        }
    }
    

function actionDown() {
    var element = listeActions.selection.index
    
    //remonter le bout de code correspondant
    var index1 = 0;
    var index2 = 0;
    var indexB = 0;
    for(i=0;i<=listeActions.selection.index;i++) {
        index1 = code.indexOf("//#",index2);
        index2 = code.indexOf("//#",index1+1);
        indexB = code.indexOf("//#",index2+1);
        }
    if (index2 != -1) {
		if ( indexB != -1 )
		code = code.substring(0,index1) + code.substring(index2,indexB) + code.substring(index1,index2) + code.substring(indexB);
		else
		code = code.substring(0,index1) + code.substring(index2) + code.substring(index1,index2);
    }
    
	refreshActions();
    listeActions.selection = element +1;
    
    }

function actionConfig () {
	
		var index = listeActions.selection.index;
		var action = listeActions.selection.text;
	
	var actionFichier = new File(dossier + action + ".jsx");
	actionFichier.open("r");
	eval(actionFichier.read());
	actionFichier.close;
	$.sleep(100);
	
     //récupère le code et remplace
     var tmp = new File(dossier + "tmp.jsx");
     tmp.open("r");
     codeTmp = tmp.read();
     tmp.close();
     delete tmp;
		var index1 = 0;
		var index2 = 0;
		for(i=0;i<=index;i++) {
        index1 = code.indexOf("//#",index2);
        index2 = code.indexOf("//#",index1+1);
        }

	 if (codeTmp != "#") {
	if (index2 != -1)
		code = code.substring(0,index1) + codeTmp + code.substring(index2);
	else
		code = code.substring(0,index1) + codeTmp;

     //recrée la pile d'actions
	refreshActions();
         }
			
} ;


function refreshActions() {

	//vider la pile
	listeActions.removeAll();
	//et la re remplir
	var A = 0 ;
	while ( ( A = code.indexOf("//#",A+1) ) != -1) {
		listeActions.add("item",code.substring(A+3,code.indexOf("\n",A)-1));
		}
	//autosave
    var autoSave = new File(dossier + "/autosave.jsx");
	autoSave.open("w");
	autoSave.write(code);
	autoSave.close();
    delete autoSave;
	
	
	}

function refreshScripts () {
	listeScripts.removeAll();
	        //charger les scripts
        var userScripts = userFolder.getFiles("*.jsx");
        for (i=0;i<userScripts.length;i++) {
            listeScripts.add("item",userScripts[i].name);
            }
	}
function save() {
                    var okToGo = false;
                    while(!okToGo) {                    
                            var save = prompt ("Name ?","Script name","Script name");
                            if (save != null) {
                                  if (save.substring(-4,save.length) != ".jsx") save = save + ".jsx";
                                  saveFile = new File(userFolder.absoluteURI + "/" +  save);
                                  if (!saveFile.exists) okToGo = true;
                                  else okToGo = confirm("This script already exists, do you want to replace it?",true,"Replace old script");
                                  }
                            saveFile.open("w");
                            saveFile.write(code);
                            saveFile.close();
                            delete saveFile;
                            }
                      delete save;
                      refreshScripts();
            }
//===================
// UI
//===================


        //Palette Duac
        //=====================
        var palette = (thisObj instanceof Panel) ? thisObj : new Window("palette","Duduf Actions");
        // liste des scripts user
        var listeScripts = palette.add("dropdownlist",[2,2,122,20]);
        //charger les scripts
        var userScripts = userFolder.getFiles("*.jsx");
        for (i=0;i<userScripts.length;i++) {
            listeScripts.add("item",userScripts[i].name);
            }
        listeScripts.onChange = function () {
            var userS = new File(userFolder.absoluteURI + "/" + listeScripts.selection.text);
            userS.open("r");
            code = userS.read();
            userS.close();
            delete userS;
            refreshActions ();  
            };
        //pile d'actions
        var listeActions = palette.add("listbox",[2,22,122,250],[],{multiselect:false});
		refreshActions ();
        //au double clic sur une action
        listeActions.onDoubleClick = actionConfig;
        //boutons
        var boutonNew = palette.add("button",[2,252,22,272],"#");
        boutonNew.onClick = function () { code = "/* Script created with Duduf Actions for After Effects version " + version + "\nhttp://www.duduf.net\n*/\n\n\n" ; refreshActions(); };
        boutonNew.helpTip = "Start new Script";
        var boutonUp = palette.add("button",[24,252,44,272],"^");
        boutonUp.onClick = actionUp;
        boutonUp.helpTip = "Move action up";
        var boutonDown = palette.add("button",[46,252,66,272],"v");
        boutonDown.onClick = actionDown;
        boutonDown.helpTip = "Move action down";
        var boutonDel = palette.add("button",[68,252,88,272],"x");
        boutonDel.onClick = actionDel;
        boutonDel.helpTip = "Delete action";
        var boutonPlay = palette.add("button",[90,252,110,272],">");
		boutonPlay.onClick = function () { eval(code) ; } ;
        boutonPlay.helpTip = "Execute Script";
        var boutonLib = palette.add("button",[2,274,44,294],"Actions");
        boutonLib.onClick = function () { fenetrelib.show(); };
        boutonLib.helpTip = "Action List";
		var boutonOptions = palette.add("button",[46,274,66,294],"o");
		boutonOptions.onClick = function () {
			fenetreOptions.show();
			}
		boutonOptions.helpTip = "Options";
        var boutonSave = palette.add("button",[68,274,88,294],"S");
        boutonSave.onClick = save;
        boutonSave.helpTip = "Save Script";
        var boutonOpen = palette.add("button",[90,274,110,294],"O");
        boutonOpen.onClick = function () { 
                	var open = File.openDialog ("Open the script");
                    if (open != null) {
                    open.open("r");
                    code = open.read();
                    open.close();
                    }
                     delete open;
                     refreshActions();
            };
        boutonOpen.helpTip = "Open Script";
        palette.add("statictext",[2,296,88,316],"v " + version);
		
		
		//fenètre des options
		//====================
		var fenetreOptions = new Window("palette","Options");
		fenetreOptions.bounds = [400,300,800,502];
		var boutonDossier = fenetreOptions.add("button",[2,2,120,20],"Script Folder :");
		boutonDossier.onClick = function () {
			var dossierUser = Folder.selectDialog("Choose the folder containing the scripts.");
			texteDossier.text = dossierUser.absoluteURI;
			delete dossierUser;
			}
		var texteDossier = fenetreOptions.add("edittext",[122,2,398,20],app.settings.getSetting("duac","user"));
		var boutonOptionsOK = fenetreOptions.add("button",[350,182,398,200],"OK");
		boutonOptionsOK.onClick = function () {
			app.settings.saveSetting("duac","user",texteDossier.text);
			userFolder = new Folder(texteDossier.text);
			fenetreOptions.hide();
			refreshScripts();
			}

        //fenètre de la bibliothèque
        //=====================
		var fenetrelib = new Window("palette","Action Library");
		fenetrelib.bounds = [300,300,500,800];
		var tree = fenetrelib.add("treeview",[0,0,200,480]);
        var libOk = fenetrelib.add("button",[0,482,200,500],"OK");

		// Ajout des nodes et items
		
		// calque / créer
		var calqueCreer = tree.add("node","Layer / Create");
		// addSolid
		var addSolid = calqueCreer.add("item","Solid");
		addSolid.script = new File(dossier + "addSolid.jsx");
        // addNull
		var addNull = calqueCreer.add("item","Null");
		addNull.script = new File(dossier + "addNull.jsx");
        // addCamera
		var addCamera = calqueCreer.add("item","Camera");
		addCamera.script = new File(dossier + "addCamera.jsx");
        // addText
        var addText = calqueCreer.add("item","Text");
		addText.script = new File(dossier + "addText.jsx");
        // addAdjustmentLayer
        var addAdjustmentLayer = calqueCreer.add("item","Adjustment Layer");
		addAdjustmentLayer.script = new File(dossier + "addAdjustmentLayer.jsx");
         //ikControl
		var ikControl2 = calqueCreer.add("item","Controller");
		ikControl2.script = new File(dossier + "ikControl.jsx");
        
        // calque / sélection
        var calqueSelect = tree.add("node","Layer / Select");
        // selectUp
        var selectUp = calqueSelect.add("item","Above");
        selectUp.script = new File(dossier + "selectUp.jsx");
        // selectUpKeep
        var selectUpKeep = calqueSelect.add("item","Keep and above");
        selectUpKeep.script = new File(dossier + "selectUpKeep.jsx");
        // selectDown
        var selectDown = calqueSelect.add("item","Below");
        selectDown.script = new File(dossier + "selectDown.jsx");
        // selectDownKeep
        var selectDownKeep = calqueSelect.add("item","Keep and below");
        selectDownKeep.script = new File(dossier + "selectDownKeep.jsx");
        // selectAll
        var selectAll = calqueSelect.add("item","All");
        selectAll.script = new File(dossier + "selectAll.jsx");
        // selectNone
        var selectNone = calqueSelect.add("item","None");
        selectNone.script = new File(dossier + "selectNone.jsx");
        // selectInvert
        var selectInvert = calqueSelect.add("item","Reverse");
        selectInvert.script = new File(dossier + "selectInvert.jsx");
        // selectIndex
        var selectIndex = calqueSelect.add("item","By index");
        selectIndex.script = new File(dossier + "selectIndex.jsx");
        // selectName
        var selectName = calqueSelect.add("item","By name");
        selectName.script = new File(dossier + "selectName.jsx");
        
        // calque / manipuler
        var calqueManip = tree.add("node","Layer / Manipulate");
        // layerDuplicate
        var layerDuplicate = calqueManip.add("item","Duplicate");
        layerDuplicate.script = new File(dossier + "layerDuplicate.jsx");
        // layerAnchorPoint
        var layerAnchorPoint = calqueManip.add("item","Anchor Point");
        layerAnchorPoint.script = new File(dossier + "layerAnchorPoint.jsx");
        // layerPosition
        var layerPosition = calqueManip.add("item","Position");
        layerPosition.script = new File(dossier + "layerPosition.jsx");
        // layerRotation
        var layerRotation = calqueManip.add("item","Rotation");
        layerRotation.script = new File(dossier + "layerRotation.jsx");
        // layer3DOrientation
        var layer3DOrientation = calqueManip.add("item","Orientation 3D");
        layer3DOrientation.script = new File(dossier + "layer3DOrientation.jsx");
        // layerScale
        var layerScale = calqueManip.add("item","Scale");
        layerScale.script = new File(dossier + "layerScale.jsx");
        //layerOpacity
        var layerOpacity = calqueManip.add("item","Opacity");
        layerOpacity.script = new File(dossier + "layerOpacity.jsx");
        // layerAlpha
        var layerAlpha = calqueManip.add("item","Blending mode and Alpha");
        layerAlpha.script = new File(dossier + "layerAlpha.jsx");
        // layerAttributes
        var layerAttributes = calqueManip.add("item","Attributes");
        layerAttributes.script = new File(dossier + "layerAttributes.jsx");
        // layerRename
        var layerRename = calqueManip.add("item","Rename");
        layerRename.script = new File(dossier + "layerRename.jsx");
        // layerPrecomp
        var layerPrecomp = calqueManip.add("item","Precompose");
        layerPrecomp.script = new File(dossier + "layerPrecomp.jsx");
        //layerMoveUp
        var layerMoveUp = calqueManip.add("item","Move Up");
        layerMoveUp.script = new File(dossier + "layerMoveUp.jsx");
        //layerMoveDown
         var layerMoveDown = calqueManip.add("item","Move Down");
        layerMoveDown.script = new File(dossier + "layerMoveDown.jsx");
		//layerParent
		var layerParent = calqueManip.add("item","Parent");
		layerParent.script = new File(dossier + "layerParent.jsx");
		//layerRemove
		var layerRemove = calqueManip.add("item","Delete");
		layerRemove.script = new File(dossier + "layerRemove.jsx");
        
        //effets
        var effets = tree.add("node","Effects");
        //addPreset
        var addPreset = effets.add("item","Apply preset");
        addPreset.script = new File(dossier + "addPreset.jsx");
        
         //IK from Duik
		var ik = tree.add("node","IK (Duik)");
		//ikCreation
		var ikCreation = ik.add("item","Create IK");
        ikCreation.script = new File(dossier + "ikCreation.jsx");
		//ikGoal
		var ikGoal = ik.add("item","IK Goal");
        ikGoal.script = new File(dossier + "ikGoal.jsx");
		//ikBone
		var ikBone = ik.add("item","Add bone");
		ikBone.script = new File(dossier + "ikBone.jsx");
		//ikControl
		var ikControl = ik.add("item","Add controller");
		ikControl.script = new File(dossier + "ikControl.jsx");
		
		//conditions
		var conditions = tree.add("node","Conditions");
		// condifionIf
		var conditionIf = conditions.add("item","If");
        conditionIf.script = new File(dossier + "conditionIf.jsx");
		// condifionElse
		var conditionElse = conditions.add("item","Else");
        conditionElse.script = new File(dossier + "conditionElse.jsx");
		// condifionEnd
		var conditionEnd = conditions.add("item","End If");
        conditionEnd.script = new File(dossier + "conditionEnd.jsx");
        
        // annulation
        var annulation = tree.add("node","Undo");
        // beginUndoGroup
        var beginUndoGroup = annulation.add("item","Begin Undo Group");
        beginUndoGroup.script = new File(dossier + "beginUndoGroup.jsx");
        // endUndoGroup
        var endUndoGroup = annulation.add("item","End Undo Group");
        endUndoGroup.script = new File(dossier + "endUndoGroup.jsx");
        
        // scripts
        var scripts = tree.add("node","Scripts");
        // exécuter un script
        var evalScript = scripts.add("item","Run a script");
        evalScript.script = new File(dossier + "evalScript.jsx");
        
		
		//au double clic sur un item
		tree.onDoubleClick = function() {
            //execute le script de creation
			tree.selection.script.open("r") ;
			eval(tree.selection.script.read()) ;
			tree.selection.script.close() ;
            $.sleep(100);
             //récupère le code et le met au bout du code en cours
             var tmp = new File(dossier + "tmp.jsx");
            tmp.open("r");
            codeTmp = tmp.read();
            tmp.close();
            delete tmp;
            if (codeTmp != "#") {
                code += codeTmp;
                //recrée la pile d'actions
			refreshActions();
                }
			} ;
        
        libOk.onClick = function() {
            //execute le script de creation
			tree.selection.script.open("r") ;
			eval(tree.selection.script.read()) ;
			tree.selection.script.close() ;
            $.sleep(100);
             //récupère le code et le met au bout du code en cours
             var tmp = new File(dossier + "tmp.jsx");
            tmp.open("r");
            codeTmp = tmp.read();
            tmp.close();
            delete tmp;
            if (codeTmp != "#") {
                code += codeTmp;
                //recrée la pile d'actions
			refreshActions();
                }
			} ;


}

Duac(this);