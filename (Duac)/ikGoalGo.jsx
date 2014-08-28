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



//  début de groupe d'annulation
app.beginUndoGroup("IK Goal " + app.project.activeItem.selectedLayers[0].name);

//dupliquer le Layer
var layer = app.project.activeItem.selectedLayers[0]
var goal = layer.duplicate();
goal.name = layer.name + " goal";
goal.parent = null;
goal.transform.position.expression = "thisComp.layer(\"" + layer.name + "\").toWorld(thisComp.layer(\"" + layer.name + "\").anchorPoint)";
layer.enabled = false;

//fin du groupe d'annulation
app.endUndoGroup();

