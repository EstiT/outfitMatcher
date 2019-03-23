package db;

import javax.xml.bind.annotation.XmlRootElement;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.DeleteResult;

import utils.Constants;

@XmlRootElement
public class MongoDB {
	
	static MongoDB instance;
	private MongoClient mongoClient;
	private MongoDatabase db;
	public MongoCollection<org.bson.Document> imageColl;
	
	public MongoDB() {
        mongoClient = new MongoClient(Constants.MONGO_HOST, Constants.MONGO_PORT);
		db = mongoClient.getDatabase(Constants.MONGO_DB);
		imageColl = db.getCollection(Constants.MONGO_COLLECTION_IMAGES);
	}
	
	public static MongoDB getInstance() {
		if (instance == null)
			instance = new MongoDB();
		return instance;
	}


	public void insertImage(org.bson.Document doc) { 
		imageColl.insertOne(doc);
	}
	
	public boolean resetDB() {
		org.bson.Document query = new org.bson.Document();
		DeleteResult r1 = imageColl.deleteMany(query);			
		return r1 != null;
	}
}
