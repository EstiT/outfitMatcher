package utils;

import java.io.File;
import java.util.regex.Pattern;

public class Constants {

    public static final Pattern IMAGE_EXTENSIONS = Pattern.compile(".*\\.(bmp|gif|png)$");
    public static final String STORE_URL = "https://"; //TODO 
    public static final String DATA_DIRECTORY = System.getProperty("user.home") + File.separator+"data"+File.separator;
	public static final String MONGO_HOST = "localhost";
	public static final int MONGO_PORT = 27017;
	public static final String MONGO_DB = "outfitMatcher";
	public static final String MONGO_COLLECTION_IMAGES = "images";
}
