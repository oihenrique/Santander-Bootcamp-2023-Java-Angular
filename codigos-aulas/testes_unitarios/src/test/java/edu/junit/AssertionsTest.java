package edu.junit;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;

public class AssertionsTest {
    @Test
    void validarLancamentos() {
        int[] primeiroLancamento = {10, 20, 30, 40, 50};
        int[] segundoLancamento = {10, 20, 30, 40, 50};
        assertArrayEquals(primeiroLancamento, segundoLancamento);
    }

    @Test
    void validarSeObjetoEstaNulo() {
        Pessoa pessoa = null;
        assertNull(pessoa);

        pessoa = new Pessoa("Luciano", LocalDate.now());
        assertNotNull(pessoa);
    }
}