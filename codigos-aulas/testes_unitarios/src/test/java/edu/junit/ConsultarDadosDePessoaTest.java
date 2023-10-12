package edu.junit;

import org.junit.jupiter.api.*;

import java.time.LocalDate;

public class ConsultarDadosDePessoaTest {
    @BeforeAll
    static void configuraConexao() {
        BancoDeDados.iniciarConexao();
        System.out.println("rodou configuraConexao");
    }

    @BeforeEach
    void inserirDadosParaTeste() {
        BancoDeDados.insereDados(new Pessoa("João", LocalDate.of(2000,2,16)));
    }

    @AfterEach
    void removerDadosDoTeste() {
        BancoDeDados.removeDados(new Pessoa("João", LocalDate.of(2000,2,16)));
    }

    @Test
    void validarDadosDeRetorno() {
        Assertions.assertTrue(true);
    }

    @Test
    void validarDadosNulos() {
        Assertions.assertNull(null);
    }

    @AfterAll
    static void finalizarConexao() {
        BancoDeDados.finalizarConexao();
        System.out.println("rodou finalizarConexao");
    }
}
