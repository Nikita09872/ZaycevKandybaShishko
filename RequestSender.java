import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class RequestSender {
    public List<Map<String, Object>> getZavod(String area) {
        List<Map<String, Object>> zavodList = new ArrayList<>();
        try (CloseableHttpClient client = HttpClients.createDefault()) {
            HttpResponse resp = client.execute(new HttpGet("http://overpass-api.de/api/interpreter?data=[out:json];area[name='" + area + "'];node(area)[amenity=factory];out;"));
            zavodList = convertToList(resp);

        } catch (IOException e) {
            e.printStackTrace();
        }
        return policeList;
    }

    public List<Map<String, Object>> convertToList(HttpResponse response) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        String respStr = new BasicResponseHandler().handleResponse(response);
        respStr = respStr.substring(respStr.indexOf("["), respStr.lastIndexOf("]") + 1);

        return mapper.readValue(respStr, new TypeReference<List<Map<String, Object>>>() {
        });
    }
}