
/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package crawler;

import java.util.Set;

import org.bson.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import db.MongoDB;
import edu.uci.ics.crawler4j.crawler.Page;
import edu.uci.ics.crawler4j.crawler.WebCrawler;
import edu.uci.ics.crawler4j.parser.HtmlParseData;
import edu.uci.ics.crawler4j.url.WebURL;
import utils.Constants;

/**
 * @author Yasser Ganjisaffar
 */
public class BasicCrawler extends WebCrawler {
  
    /**
     * You should implement this function to specify whether the given url
     * should be crawled or not (based on your crawling logic).
     */
    @Override
    public boolean shouldVisit(Page referringPage, WebURL url) {
        String href = url.getURL().toLowerCase();
        
        //visit images 
        if(Constants.IMAGE_EXTENSIONS.matcher(href).matches() && href.startsWith("https://estit.github.io/")) {
        	return true;
        }
        
        // Ignore the url if it has an extension that matches our defined set of image extensions.
        if (Constants.IMAGE_EXTENSIONS.matcher(href).matches()) {
            return false;
        }

        // Only accept the url if it is in the "www.ics.uci.edu" domain and protocol is "http".
        return href.startsWith(Constants.STORE_URL);
    }

    /**
     * This function is called when a page is fetched and ready to be processed
     * by your program.
     */
    @Override
    public void visit(Page page) {
    	
        int docid = page.getWebURL().getDocid();
        String url = page.getWebURL().getURL();
        System.out.println("Visiting "+url);
        
        String html = "";
        if (page.getParseData() instanceof HtmlParseData) {
            HtmlParseData htmlParseData = (HtmlParseData) page.getParseData();
            html = htmlParseData.getHtml();
            Set<WebURL> links = htmlParseData.getOutgoingUrls();

            System.out.println("\nNumber of outgoing links: "+ links.size());
        }
        
		org.jsoup.nodes.Document document = org.jsoup.Jsoup.parse(html);
		
		String imgSelector	= "img[src~=(?i)\\.(png|jpe?g|gif)]";	
		Elements images	= document.select(imgSelector);	
		
		String txtSelector	= "p,h1,h2,h3";//,h1,h2,h3,h4	
		Elements text = document.select(txtSelector);	
		
		//insert image 
		Document doc = new Document("images", getImages(images))
				.append("text", getText(text));//TODO?
		
		MongoDB.getInstance().insertImage(doc);
    }
    

    
    public String getImages(Elements images) {
    	String s = "";
    	for(Element img : images) {
    		s += img.attr("src")+ "  alt: " + img.attr("alt") + "  width: " + img.attr("width") + "  eight: " + img.attr("height");
    	}
    	return s;
    }
    
    public String getText(Elements text) {
    	String s = "";
    	for(Element el : text) {
    		s += el.text() + " ";
    	}
    	return s;
    }
}