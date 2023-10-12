package edu.junit;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.*;

public class CondicionaisTest {
    @Test
    @EnabledOnOs({OS.LINUX, OS.MAC})
    @EnabledOnJre(JRE.JAVA_17)
    void validarAlgoSomenteNoUsuarioHenrique() {
        Assumptions.assumeFalse("Henrique".equals(System.getenv("USER")));
        Assertions.assertEquals(10, 5 + 5);
    }

    @Test
    @EnabledIfEnvironmentVariable(named = "user", matches = "Henrique")
    //@DisabledIfEnvironmentVariable()
    void validarAlgoSomenteNoUsuarioHenrique1() {
        Assertions.assertEquals(10, 5 + 5);
    }
}
