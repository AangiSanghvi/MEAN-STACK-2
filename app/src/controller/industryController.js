const CsvReaderService = require('../services/csvreader');
const IndustryModel = require("../model/industryModel")

module.exports.uploadIndustry = async function(req, res){

    let allIndustry = await CsvReaderService.uploadIndustry()
    
    IndustryModel.insertMany(allIndustry).then(data=>{

        res.json({data:data, msg:"Industry Uploaded", status:200})
    })

}