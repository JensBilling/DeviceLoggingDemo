package se.jensbilling.deviceloggingdemo.models;

public class DataModel {
    private long millisSinceEpoch;
    private float temperature;
    private float humidity;
    private float lightLevel;

    public DataModel(long millisSinceEpoch, float temperature, float humidity, float lightLevel) {
        this.millisSinceEpoch = millisSinceEpoch;
        this.temperature = temperature;
        this.humidity = humidity;
        this.lightLevel = lightLevel;
    }

    public long getMillisSinceEpoch() {
        return millisSinceEpoch;
    }

    public void setMillisSinceEpoch(long millisSinceEpoch) {
        this.millisSinceEpoch = millisSinceEpoch;
    }

    public float getTemperature() {
        return temperature;
    }

    public void setTemperature(float temperature) {
        this.temperature = temperature;
    }

    public float getHumidity() {
        return humidity;
    }

    public void setHumidity(float humidity) {
        this.humidity = humidity;
    }

    public float getLightLevel() {
        return lightLevel;
    }

    public void setLightLevel(float lightLevel) {
        this.lightLevel = lightLevel;
    }
}
