
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

import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;

import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

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
        return href.startsWith(Constants.STORE_URL_BASE);
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
        }
        
		org.jsoup.nodes.Document document = org.jsoup.Jsoup.parse(html);
		
		Elements prodList = document.select("ul.products-listing");
		Elements images	= prodList.select("img.item-image");	
		getImages(images, Integer.toString(docid));
		
    }
    
  
    public void getImages(Elements images, String docId) {
    	int i = 0;
    	for(Element img : images) {
    		String src = "https:"+img.attr("src");
    		try {
				saveImage(src, docId+Integer.toString(i));
			} catch (IOException e) {
				e.printStackTrace();
			}
    		i++;
    		if(i>=5) {
    			break;
    		}
    	}
    }
    
    
//    https://examples.javacodegeeks.com/enterprise-java/html/download-images-from-a-website-using-jsoup/
    private static void saveImage(String src, String docId) throws IOException { 
    	try {
    		URL url = new URL(src);
    		InputStream in = url.openStream();
    		OutputStream out = new BufferedOutputStream(new FileOutputStream(Constants.IMAGE_PATH+docId+".png"));
    		for (int b; (b = in.read()) != -1;) {
    			out.write(b);
    		}
    	    out.close();
    	    in.close();
    	} catch(Exception e) {
//    		die quietly...
//    		e.printStackTrace();
    	}
    }
}