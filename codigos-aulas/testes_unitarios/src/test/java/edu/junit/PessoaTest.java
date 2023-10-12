package edu.junit;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

class PessoaTest {
    @Test
    void validarCalculoIdade() {
        Pessoa pessoa = new Pessoa("Julia", LocalDate.of(2020, 1, 1));
        Assertions.assertEquals(3, pessoa.getIdade());
    }

    @Test
    void deveRetornarMaiorDeIdade() {
        Pessoa pessoa = new Pessoa("Julia", LocalDate.of(2000, 1, 1));
        Assertions.assertTrue(pessoa.ehMaiorDeIdade());

        Pessoa pessoa1 = new Pessoa("João", LocalDate.now());
        Assertions.assertFalse(pessoa1.ehMaiorDeIdade());
    }

}