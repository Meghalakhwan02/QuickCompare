package com.quickcompare.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.ByteArrayResource;

import java.io.IOException;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:3000}") // Allow frontend access
public class FaceComparisonController {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${face.api.url:http://face-recognition-teamsync.apps.lab.ocp.lan/teamsync/face-recognition/compare-faces}")
    private String apiUrl;

    @PostMapping(value = "/compare", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> compareFaces(
            @RequestParam("image1") MultipartFile image1,
            @RequestParam("image2") MultipartFile image2) {

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Accept", "application/json");
            // Important: Do NOT set Content-Type to multipart/form-data manually here.
            // RestTemplate will set it automatically with the correct boundary.

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

            // Wrap part in HttpEntity to include Content-Type header for the part
            HttpHeaders partHeaders1 = new HttpHeaders();
            partHeaders1
                    .setContentType(image1.getContentType() != null ? MediaType.parseMediaType(image1.getContentType())
                            : MediaType.IMAGE_JPEG);
            HttpEntity<ByteArrayResource> part1 = new HttpEntity<>(
                    new MultipartFileResource(image1.getBytes(), image1.getOriginalFilename()),
                    partHeaders1);

            HttpHeaders partHeaders2 = new HttpHeaders();
            partHeaders2
                    .setContentType(image2.getContentType() != null ? MediaType.parseMediaType(image2.getContentType())
                            : MediaType.IMAGE_JPEG);
            HttpEntity<ByteArrayResource> part2 = new HttpEntity<>(
                    new MultipartFileResource(image2.getBytes(), image2.getOriginalFilename()),
                    partHeaders2);

            body.add("image1", part1);
            body.add("image2", part2);

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    apiUrl,
                    HttpMethod.POST,
                    requestEntity,
                    String.class);

            return ResponseEntity.status(response.getStatusCode()).body(response.getBody());

        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error processing files: " + e.getMessage());
        } catch (RestClientException e) {
            // Log the error in a real app
            return ResponseEntity.internalServerError().body("External API Error: " + e.getMessage());
        }
    }

    // Helper class to wrap byte arrays as Resources with filenames
    private static class MultipartFileResource extends ByteArrayResource {
        private final String filename;

        public MultipartFileResource(byte[] content, String filename) {
            super(content);
            this.filename = filename;
        }

        @Override
        public String getFilename() {
            return this.filename;
        }
    }
}
