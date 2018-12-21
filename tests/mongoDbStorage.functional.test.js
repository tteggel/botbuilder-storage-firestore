const assert = require('assert');
const { MongoDbStorage } = require('../lib/MongoDbStorage');
const sinon = require('sinon');
const {ConversationState} = require('botbuilder');

//require MongoClient to set up fakes and stubs, not actual database connectivity
const { MongoClient } = require('mongodb');


const getSettings = () => ({
  url: "mongodb://localhost:27017/",
  database: "botframework",
  collection: "botframeworkstate"
});

describe('MongoDbStorage -Functional', function () {
 
  describe('collection property', async function (done) {
    it('calls MongoClient.db with database name', async function () {
      //arrange
      let context = {};
      context.turnState = {
        get : function(){
          return {};
        },
        set : function(){
          return {};
        }        
      };
      context.activity = {
        channelId : "channel1",
        conversation : {
          id : "convo"
        }
      };
      const storage = new MongoDbStorage({
        url: 'fake_url',
        database: 'fake_db'
      });
      storage.read = function(keys){
        console.log(keys);
        return new Promise(function(resolve,reject){
          resolve({});
        });

      }

      const conversationState = new ConversationState(storage);
      let property = conversationState.createProperty("foo");
      let state = await property.get(context,{});
      state.foo = "bar";
      property.set(context,state);
      conversationState.saveChanges(context);
      
      

 



      //assert
      
    });
  });

});



