package se.jensbilling.deviceloggingdemo.controllers;

import org.springframework.web.bind.annotation.*;
import se.jensbilling.deviceloggingdemo.models.DataModel;

import javax.xml.crypto.Data;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/log")
public class loggingController {

    List<DataModel> dataModels = new ArrayList<>();

    @GetMapping("/generate")
    String generateDummyData() {
        DataModel dataModel1 = new DataModel(1675533600373L, 15, 50, 50.00f);
        DataModel dataModel2 = new DataModel(1675533602373L, 16, 51, 50.01f);
        DataModel dataModel3 = new DataModel(1675533604373L, 17, 52, 49.99f);

        dataModels.add(dataModel1);
        dataModels.add(dataModel2);
        dataModels.add(dataModel3);

        return "Dummy data generated";
    }

    @GetMapping("/all")
    List<DataModel> getAll() {
        return dataModels;
    }

    @GetMapping("/recent")
    List<DataModel> getLast100Logs() {
        if (dataModels.size() < 1) {
            return new ArrayList<>();
        } else if (dataModels.size() <= 100) {
            return dataModels;
        }

        return dataModels.subList(dataModels.size() - 100, dataModels.size());
    }

    @PostMapping("")
    String saveLog(@RequestBody String data) {
        var splitData = data.split(",");
        long millisSinceEpochTime = System.currentTimeMillis();
        float temperature = Float.parseFloat(splitData[1]);
        float humidity = Float.parseFloat(splitData[2]);
        float lightLevel = Float.parseFloat(splitData[3]);

        DataModel dataModel = new DataModel(millisSinceEpochTime, temperature, humidity, lightLevel);
        dataModels.add(dataModel);
        return "Successfully saved log";
    }

    @PostMapping("collection")
    String saveLogCollection(@RequestBody String data) {
        var dataRows = data.split("\n");
        List<Long> timeCorrections = new ArrayList<>();
        Long currentMillisSinceEpoch = System.currentTimeMillis();

        for (String row : dataRows) {
            var splitData = row.split(",");
            Long timeCorrection = Long.parseLong(splitData[0]);
            timeCorrections.add(timeCorrection);
        }

        Collections.reverse(timeCorrections);
        timeCorrections.remove(0);
        timeCorrections.add(0L);

        for (int i = 0; i < dataRows.length; i++) {
            var splitData = dataRows[i].split(",");

            long millisSinceEpoch = currentMillisSinceEpoch - timeCorrections.get(i);
            float temperature = Float.parseFloat(splitData[1]);
            float humidity = Float.parseFloat(splitData[2]);
            float lightLevel = Float.parseFloat(splitData[3]);

            DataModel dataModel = new DataModel(millisSinceEpoch, temperature, humidity, lightLevel);

            dataModels.add(dataModel);
        }

        return "Successfully saved logCollection";
    }

    @DeleteMapping("")
    String clearData() {
        dataModels.clear();
        return "Successfully cleared data";
    }

}
