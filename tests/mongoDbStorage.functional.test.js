const assert = require('assert');
const { MongoDbStorage } = require('../lib/MongoDbStorage');
const sinon = require('sinon');
const {ConversationState} = require('botbuilder');

//require MongoClient to set up fakes and stubs, not actual database connectivity
const { MongoClient } = require('mongodb');
const getContext = () => ({
  turnState : {
    get : function(){
      return {};
    },
    set : function(){
      return {};
    }        
  },
  activity : {
    channelId : "channel1",
    conversation : {
      id : "convo"
    }
  }
});


describe('MongoDbStorage -Functional', function () {
 
  describe('collection property', async function (done) {
    it('calls MongoClient.db with database name', async function () {
      let context = getContext();
 
      const storage = new MongoDbStorage({
        url: "mongodb://localhost:27017/",
        database: "botframework",
        collection: "functionalteststate"
      });

      await storage.connect();
      
      const conversationState = new ConversationState(storage);
      let property = conversationState.createProperty("foo");
      let state = await property.get(context,{});
      state.foo = "bar";
      property.set(context,state);
      conversationState.saveChanges(context);     
    });
  });

});



