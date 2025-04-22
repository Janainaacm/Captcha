package com.example.be.config;


import lombok.Getter;
import lombok.Setter;

import java.awt.*;

@Getter
@Setter
public final class CaptchaConfig {
    private int width = 160;

    private int height = 60;

    private int length = 6;

    private int noise = 15;

    private boolean dark = false;

    private Color[] lightPalette = {Color.BLACK, Color.DARK_GRAY, Color.BLUE, Color.GREEN, Color.RED};

    private Color[] darkPalette = {Color.WHITE, Color.LIGHT_GRAY, Color.CYAN, Color.MAGENTA, Color.ORANGE};

    private Color darkBackgroundColor = new Color(30, 30, 30);

    private Color lightBackgroundColor = Color.WHITE;

    private int[] fontStyles = {Font.PLAIN, Font.BOLD, Font.ITALIC, Font.BOLD + Font.ITALIC};

    private String[] fonts = {};

    public CaptchaConfig() {
    }

    public CaptchaConfig(int width, int height, int length, int noise, boolean dark, Color[] lightPalette, Color[] darkPalette,
                         Color lightBackgroundColor, Color darkBackgroundColor, int[] fontStyles, String[] fonts) {
        this.width = width;
        this.height = height;
        this.length = length;
        this.noise = noise;
        this.dark = dark;
        this.lightPalette = lightPalette;
        this.darkPalette = darkPalette;
        this.lightBackgroundColor = lightBackgroundColor;
        this.darkBackgroundColor = darkBackgroundColor;
        this.fontStyles = fontStyles;
        this.fonts = fonts;
    }

    public CaptchaConfig(int width, int height, int length, int noise, boolean dark, Color lightBackgroundColor,
                         Color darkBackgroundColor) {
        this.width = width;
        this.height = height;
        this.length = length;
        this.noise = noise;
        this.lightBackgroundColor = lightBackgroundColor;
        this.darkBackgroundColor = darkBackgroundColor;
        this.dark = dark;
    }

    public CaptchaConfig(int width, int height, int length, int noise, boolean dark) {
        this.width = width;
        this.height = height;
        this.length = length;
        this.noise = noise;
        this.dark = dark;
    }
}
