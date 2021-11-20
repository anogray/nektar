const http = require('http'),
fs = require("fs"),
getUrl = require('url');

let textMap = new Map();

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'}); 
    

    const url = req.url;
    const queryObject = getUrl.parse(req.url,true).query;

    
    const fileUrl = __dirname+"\\example.txt";
    const urlBeforeParams = url.split("?")
    // console.log({urlBeforeParams});

    //server listening
    if(url=="/"){
        res.write('Server Listening'); 
        res.end(); 

    }

    //query to get totalWords
    if(url=="/totalWords"){
        
        let readStream = fs.createReadStream(fileUrl);

        let count = 0;
        let totalWords = 0;
        readStream.on("data", function(data) {
            let chunk = data.toString();
            totalWords += chunk.split("").length;
            count++;
            // console.log({totalWords});
        }); 

        readStream.on('close', function(){
            console.log('Read and processed total number of words',totalWords);
            res.write(JSON.stringify({success:true, totalWords:totalWords}))
            res.end();
          });



    }

    //query to get total number of Sentences
    if(url=="/totalSentences"){
        
        let readStream = fs.createReadStream(fileUrl);

        let count = 0;
        let totalSentences = 0;
        readStream.on("data", function(data) {
            let chunk = data.toString();
            // console.log({chunk});

            totalSentences += chunk.split(".").length;
            count++;
        }); 

        readStream.on('close', function(){
            console.log('Read and processed total number of sentences',totalSentences);
            res.write(JSON.stringify({success:true, totalSentences:totalSentences}))
            res.end();
          });

    }

    //query to get total occurence of the word send from query parameter
    if(urlBeforeParams[0]=="/totalOccurences"){

        const word = queryObject.word;

        if(word){
        let readStream = fs.createReadStream(fileUrl);

        let totalOccurences = 0;
        readStream.on("data", function(data) {
            let chunk = data.toString();
            chunk = chunk.replace(/[\r\n]+/g,"");

            // console.log({chunk});
            let arr = chunk.split(" ");

            for(let i=0;i<arr.length; i++){
                if(arr[i]==word || arr[i]==word+"."){
                    totalOccurences++;
                }
            }
        }); 

        readStream.on('close', function(){
            console.log(`Read and processed total number of occurence of ${word} is ${totalOccurences}`);
            res.write(JSON.stringify({success:true,totalOccurences:totalOccurences}))
            res.end();
          });
        }else{
            res.write(JSON.stringify({success:false, errorMessage : "Error please key value to search occurence with word=value"}));
            res.end();
        }
    }

    //query to get top 10 most frequency words & lowest top 10 words frequency
    if(urlBeforeParams[0]=="/wordFrequency"){
        res.write(JSON.stringify({success:true, dataMessage : "Need to see priority queue in js"}));
        res.end();

        // let readStream = fs.createReadStream(fileUrl);

        // let freq = {}
        // readStream.on("data", function(data) {
        //     let chunk = data.toString();
        //     chunk = chunk.replace(/[\r\n]+/g,"");

        //     // console.log({chunk});
        //     let arr = chunk.split(" ");

        //     for(let i=0; i<strArr.length; i++){
        //         if(ansMap[strArr[i]]){
        //             ansMap[strArr[i]]+=1
        //         }else{
        //             ansMap[strArr[i]]=1;
        //         }
        //     }
        // }); 

        // readStream.on('close', function(){
        //     console.log('Read and processed total number of sentences',freq);

        //     res.write(JSON.stringify({totalOccurences:totalOccurences}))
        //     res.end();
        //   });
        
    }





  }).listen(4000); //the server is listening on port 4000