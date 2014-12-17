Ext.data.JsonP.AbstractCollection({"tagname":"class","name":"AbstractCollection","autodetected":{},"files":[{"filename":"AbstractCollection.js","href":"AbstractCollection.html#AbstractCollection"},{"filename":"AbstractCollection.js","href":"AbstractCollection.html#AbstractCollection"}],"abstract":true,"members":[{"name":"deleteModel","tagname":"method","owner":"AbstractCollection","id":"method-deleteModel","meta":{}},{"name":"ensureLoaded","tagname":"method","owner":"AbstractCollection","id":"method-ensureLoaded","meta":{}},{"name":"first","tagname":"method","owner":"AbstractCollection","id":"method-first","meta":{}},{"name":"getCollection","tagname":"method","owner":"AbstractCollection","id":"method-getCollection","meta":{}},{"name":"getIndexById","tagname":"method","owner":"AbstractCollection","id":"method-getIndexById","meta":{}},{"name":"getModel","tagname":"method","owner":"AbstractCollection","id":"method-getModel","meta":{}},{"name":"getModelAttrs","tagname":"method","owner":"AbstractCollection","id":"method-getModelAttrs","meta":{}},{"name":"goToId","tagname":"method","owner":"AbstractCollection","id":"method-goToId","meta":{}},{"name":"index","tagname":"method","owner":"AbstractCollection","id":"method-index","meta":{}},{"name":"last","tagname":"method","owner":"AbstractCollection","id":"method-last","meta":{}},{"name":"length","tagname":"method","owner":"AbstractCollection","id":"method-length","meta":{}},{"name":"load","tagname":"method","owner":"AbstractCollection","id":"method-load","meta":{"abstract":true}},{"name":"next","tagname":"method","owner":"AbstractCollection","id":"method-next","meta":{}},{"name":"prev","tagname":"method","owner":"AbstractCollection","id":"method-prev","meta":{}},{"name":"savedCount","tagname":"method","owner":"AbstractCollection","id":"method-savedCount","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-AbstractCollection","extends":null,"singleton":null,"private":null,"mixins":[],"requires":[],"uses":[],"short_doc":"Abstract class for collections\n\n Collections are a list of related models, which we can navigate through. ...","component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/AbstractCollection.html#AbstractCollection' target='_blank'>AbstractCollection.js</a></div><div class='dependency'><a href='source/AbstractCollection.html#AbstractCollection' target='_blank'>AbstractCollection.js</a></div></pre><div class='doc-contents'><p>Abstract class for collections</p>\n\n<p> Collections are a list of related models, which we can navigate through. For instance, we can load a collection for all of a user's Gratitude Journal entries. This\n allows us to load all journal entries in collection, and provide them to <a href=\"#!/api/BlissView\" rel=\"BlissView\" class=\"docClass\">BlissView</a> allowing the user to navigate through all entries.</p>\n\n<p> Sub-classes can extend AbstractCollection in order to allow for different storage mechanisms</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-deleteModel' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AbstractCollection'>AbstractCollection</span><br/><a href='source/AbstractCollection.html#AbstractCollection-method-deleteModel' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AbstractCollection-method-deleteModel' class='name expandable'>deleteModel</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Deletes model at current index ...</div><div class='long'><p>Deletes model at current index</p>\n</div></div></div><div id='method-ensureLoaded' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AbstractCollection'>AbstractCollection</span><br/><a href='source/AbstractCollection.html#AbstractCollection-method-ensureLoaded' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AbstractCollection-method-ensureLoaded' class='name expandable'>ensureLoaded</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Throw an error if the collection is not yet loaded ...</div><div class='long'><p>Throw an error if the collection is not yet loaded</p>\n</div></div></div><div id='method-first' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AbstractCollection'>AbstractCollection</span><br/><a href='source/AbstractCollection.html#AbstractCollection-method-first' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AbstractCollection-method-first' class='name expandable'>first</a>( <span class='pre'></span> ) : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Advances the pointer to the last model and returns it ...</div><div class='long'><p>Advances the pointer to the last model and returns it</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>model</p>\n</div></li></ul></div></div></div><div id='method-getCollection' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AbstractCollection'>AbstractCollection</span><br/><a href='source/AbstractCollection.html#AbstractCollection-method-getCollection' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AbstractCollection-method-getCollection' class='name expandable'>getCollection</a>( <span class='pre'></span> ) : Object[]<span class=\"signature\"></span></div><div class='description'><div class='short'>Return all models in the collection ...</div><div class='long'><p>Return all models in the collection</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object[]</span><div class='sub-desc'><p>models</p>\n</div></li></ul></div></div></div><div id='method-getIndexById' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AbstractCollection'>AbstractCollection</span><br/><a href='source/AbstractCollection.html#AbstractCollection-method-getIndexById' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AbstractCollection-method-getIndexById' class='name expandable'>getIndexById</a>( <span class='pre'>id</span> ) : Number/Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Get index of the model in collection by id ...</div><div class='long'><p>Get index of the model in collection by id</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : String<div class='sub-desc'><p>the id of the model to find the index for</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number/Boolean</span><div class='sub-desc'><p>Index of model. False if model id is not in index</p>\n</div></li></ul></div></div></div><div id='method-getModel' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AbstractCollection'>AbstractCollection</span><br/><a href='source/AbstractCollection.html#AbstractCollection-method-getModel' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AbstractCollection-method-getModel' class='name expandable'>getModel</a>( <span class='pre'></span> ) : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Get the current model indexed in the collection based on our internal pointer ...</div><div class='long'><p>Get the current model indexed in the collection based on our internal pointer</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>model</p>\n</div></li></ul></div></div></div><div id='method-getModelAttrs' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AbstractCollection'>AbstractCollection</span><br/><a href='source/AbstractCollection.html#AbstractCollection-method-getModelAttrs' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AbstractCollection-method-getModelAttrs' class='name expandable'>getModelAttrs</a>( <span class='pre'></span> ) : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Get the attributes of currently index model - field names / values ...</div><div class='long'><p>Get the attributes of currently index model - field names / values</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>attributes</p>\n</div></li></ul></div></div></div><div id='method-goToId' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AbstractCollection'>AbstractCollection</span><br/><a href='source/AbstractCollection.html#AbstractCollection-method-goToId' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AbstractCollection-method-goToId' class='name expandable'>goToId</a>( <span class='pre'>id</span> ) : Number/Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Set collection index to point to the model with id of 'id' ...</div><div class='long'><p>Set collection index to point to the model with id of 'id'</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : String<div class='sub-desc'><p>the id of the model to set the index to</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number/Boolean</span><div class='sub-desc'><p>Index of model. False if model id is not in index</p>\n</div></li></ul></div></div></div><div id='method-index' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AbstractCollection'>AbstractCollection</span><br/><a href='source/AbstractCollection.html#AbstractCollection-method-index' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AbstractCollection-method-index' class='name expandable'>index</a>( <span class='pre'>index</span> ) : Object/Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Advances the pointer to the model at index and returns it, or false if doesn't exist ...</div><div class='long'><p>Advances the pointer to the model at index and returns it, or false if doesn't exist</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>index</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object/Boolean</span><div class='sub-desc'><p>model</p>\n</div></li></ul></div></div></div><div id='method-last' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AbstractCollection'>AbstractCollection</span><br/><a href='source/AbstractCollection.html#AbstractCollection-method-last' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AbstractCollection-method-last' class='name expandable'>last</a>( <span class='pre'></span> ) : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Advances the pointer to the first model and returns it ...</div><div class='long'><p>Advances the pointer to the first model and returns it</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>model</p>\n</div></li></ul></div></div></div><div id='method-length' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AbstractCollection'>AbstractCollection</span><br/><a href='source/AbstractCollection.html#AbstractCollection-method-length' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AbstractCollection-method-length' class='name expandable'>length</a>( <span class='pre'></span> ) : Number<span class=\"signature\"></span></div><div class='description'><div class='short'>Return number of models in the collection ...</div><div class='long'><p>Return number of models in the collection</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number</span><div class='sub-desc'><p>length</p>\n</div></li></ul></div></div></div><div id='method-load' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AbstractCollection'>AbstractCollection</span><br/><a href='source/AbstractCollection.html#AbstractCollection-method-load' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AbstractCollection-method-load' class='name expandable'>load</a>( <span class='pre'>callback</span> )<span class=\"signature\"><span class='abstract' >abstract</span></span></div><div class='description'><div class='short'>Abstract method to load collection which should be implemented by the sub-class ...</div><div class='long'><p>Abstract method to load collection which should be implemented by the sub-class</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>callback</span> : Function<div class='sub-desc'><p>Callback function which will be executed when the collection is loaded</p>\n</div></li></ul></div></div></div><div id='method-next' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AbstractCollection'>AbstractCollection</span><br/><a href='source/AbstractCollection.html#AbstractCollection-method-next' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AbstractCollection-method-next' class='name expandable'>next</a>( <span class='pre'>e</span> ) : Object/Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Advances the pointer to the next model and returns it ...</div><div class='long'><p>Advances the pointer to the next model and returns it</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>e</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object/Boolean</span><div class='sub-desc'><p>model returns false if no model exists</p>\n</div></li></ul></div></div></div><div id='method-prev' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AbstractCollection'>AbstractCollection</span><br/><a href='source/AbstractCollection.html#AbstractCollection-method-prev' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AbstractCollection-method-prev' class='name expandable'>prev</a>( <span class='pre'>e</span> ) : Object/Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Advances the pointer to the previous model and returns it ...</div><div class='long'><p>Advances the pointer to the previous model and returns it</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>e</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object/Boolean</span><div class='sub-desc'><p>model returns false if no model exists</p>\n</div></li></ul></div></div></div><div id='method-savedCount' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AbstractCollection'>AbstractCollection</span><br/><a href='source/AbstractCollection.html#AbstractCollection-method-savedCount' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AbstractCollection-method-savedCount' class='name expandable'>savedCount</a>( <span class='pre'></span> ) : Number<span class=\"signature\"></span></div><div class='description'><div class='short'>Return number of models in the collection that have been saved before (are not newly created) ...</div><div class='long'><p>Return number of models in the collection that have been saved before (are not newly created)</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number</span><div class='sub-desc'><p>length</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{"abstract":true}});