package com.example.be.controller;

import com.example.be.captcha.Captcha;
import com.example.be.captcha.GeneratedCaptcha;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/captcha")
public class CaptchaController {

    private final Captcha captchaService;

    public CaptchaController(Captcha captchaService) {
        this.captchaService = captchaService;
    }

    @GetMapping("/generate")
    public ResponseEntity<byte[]> generateCaptcha(HttpSession session) throws IOException {
        GeneratedCaptcha captcha = captchaService.generate();

        session.setAttribute("captcha", captcha.code());
        System.out.println("captcha: " + captcha.code());

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(captcha.image(), "png", baos);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, MediaType.IMAGE_PNG_VALUE)
                .body(baos.toByteArray());
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyCaptcha(@RequestBody Map<String, String> body, HttpSession session) {
        String userInput = body.get("captcha");
        String correctCaptcha = (String) session.getAttribute("captcha");
        System.out.println("userInput: " + userInput);
        System.out.println("correctCaptcha: " + correctCaptcha);

        if (correctCaptcha != null && correctCaptcha.equalsIgnoreCase(userInput)) {
            session.removeAttribute("captcha");
            System.out.println("Successfully verified captcha");
            return ResponseEntity.ok("Captcha verified successfully");
        } else {
            System.out.println("Incorrect captcha");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid captcha");
        }
    }
}
