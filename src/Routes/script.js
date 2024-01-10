const { TIMEOUT } = require('dns');
const puppeteer = require('puppeteer');

(async () => {
    try {
        // ---------delay function ------
        function delay(time) {
            return new Promise(function(resolve) { 
                setTimeout(resolve, time)
            });
        }

    // --------- lunch browser
      const browser = await puppeteer.launch({headless:false});
    
    // ----------- lunch new page -------
      const page = await browser.newPage();
      //await page.goto('https://www.bannerbear.com');
      await page.goto('https://www.bulkblacklist.com/');

      // ----------- test existence of selected element -------
      function sele(select)
      {
        if(select != null || select != undefined)
        {
            return true;
        }
        else{
            return false;
        }
      }
      
      // -------- first add --------
      await delay(2000);
      const exit = await page.$('.CloseButton__ButtonElement-sc-79mh24-0 > svg:nth-child(1)');
      if(sele(exit))
      {
        await page.click('.CloseButton__ButtonElement-sc-79mh24-0 > svg:nth-child(1)');
      }
        await delay(3000);

        // -------- second add --------
        /*
      const exit1 =await page.$('.fjeyDK > svg:nth-child(1)');
      if(sele(exit1))
      {
        await page.click('.fjeyDK > svg:nth-child(1)');
      }
*/
    //--------- read txt content ---------
    const {readFileSync,writeFileSync, promises: fsPromises} = require('fs');

    const contents = await fsPromises.readFile('new_ip.txt', 'utf-8');

    const arr = contents.split(/\r?\n/);

    //---------- ip array to string ----------
    var ip ="";
    for(i=0;i<arr.length;i++)
    {
        if(i == 0)
        {
            ip = arr[i];
        }
        else
        {
            ip =ip + "\n" + arr[i]
        }
        
    }
    await page.type('body > center > div > div > div > form > textarea',ip);
    await delay(1000);
    await page.click("body > center > div > div > div > form > input");
    await delay(1000);
    await page.waitForSelector('body > center > div > p:nth-child(8) > button', {visible: true,timeout: 600000});

    await delay(1000);
    

    
    const evaluate_result = await page.evaluate(() =>{  // https://proxy-checker.net/en/blacklist/      
        table = document.querySelector("body > center > div > div > div > table");
        var acctive_ips ="";
        var disabled_ips="";
        var results =new Array();
        var SpamCop="";
        var SPAMHAUS="";
        var Barracuda ="";
        for(i = 1; i <table.rows.length;i++)
        {
            /* this is for SpamCop  */
            if(table.rows[i].cells[3].childNodes[0].hasChildNodes("a"))
            {
                SpamCop = table.rows[i].cells[3].childNodes[0].childNodes[0].src.split("/")[4].split(".")[0];
            }
            else
            {
                SpamCop = table.rows[i].cells[3].childNodes[0].src.split("/")[4].split(".")[0];
            }

            /* this is for SPAMHAUS  */
            
            if(table.rows[i].cells[4].childNodes[0].hasChildNodes("a"))
            {
                SPAMHAUS = table.rows[i].cells[4].childNodes[0].childNodes[0].src.split("/")[4].split(".")[0];
            }
            else
            {
                SPAMHAUS = table.rows[i].cells[4].childNodes[0].src.split("/")[4].split(".")[0];
            }
            
            /* this is for Barracuda  */
            
            if(table.rows[i].cells[5].childNodes[0].hasChildNodes("a"))
            {
                Barracuda = table.rows[i].cells[5].childNodes[0].childNodes[0].src.split("/")[4].split(".")[0];
            }
            else
            {
                Barracuda = table.rows[i].cells[5].childNodes[0].src.split("/")[4].split(".")[0];
            }
            if(SpamCop == "g" && SPAMHAUS == "g" && Barracuda == "g" )
            {
                acctive_ips+= table.rows[i].cells[1].childNodes[0].innerHTML + "\n";
            }
            else
            {
                disabled_ips+= table.rows[i].cells[1].childNodes[0].innerHTML + "\n";
            }
        }
        results.push(acctive_ips);
        results.push(disabled_ips);
        
        return results;
    });
    console.log(evaluate_result[1])
    //   ------ acctive proxy data to txt ----------
    await fsPromises.writeFile('odin1.txt', evaluate_result[0]);
    await fsPromises.writeFile('odin2.txt', evaluate_result[1]);
    await browser.close();

    } catch (error) {
        console.log("this is the error : "+error)
    }
})()