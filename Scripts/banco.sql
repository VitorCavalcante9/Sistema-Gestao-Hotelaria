-- -----------------------------------------------------
-- Schema sgh
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `sgh` ;

-- -----------------------------------------------------
-- Schema sgh
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sgh` DEFAULT CHARACTER SET utf8 ;
USE `sgh` ;

-- -----------------------------------------------------
-- Table `sgh`.`registro_imobiliario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`registro_imobiliario` ;

CREATE TABLE IF NOT EXISTS `sgh`.`registro_imobiliario` (
  `num_registro` VARCHAR(60) NOT NULL,
  `metragem` DOUBLE NOT NULL,
  `descricao` TEXT NOT NULL,
  `logradouro` VARCHAR(60) NOT NULL,
  `numero` VARCHAR(5) NOT NULL,
  `CEP` VARCHAR(9) NOT NULL,
  `bairro` VARCHAR(45) NOT NULL,
  `cidade` VARCHAR(60) NOT NULL,
  `estado` CHAR(2) NOT NULL,
  `latitude` DOUBLE NOT NULL,
  `longitude` DOUBLE NOT NULL,
  PRIMARY KEY (`num_registro`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`hotel`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`hotel` ;

CREATE TABLE IF NOT EXISTS `sgh`.`hotel` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `reg_imobiliario_id` VARCHAR(60) NOT NULL,
  `nome` VARCHAR(60) NOT NULL,
  `descricao` TEXT NOT NULL,
  `categoria` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_hotel_reg_imobiliario`
    FOREIGN KEY (`reg_imobiliario_id`)
    REFERENCES `sgh`.`registro_imobiliario` (`num_registro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`setores`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`setores` ;

CREATE TABLE IF NOT EXISTS `sgh`.`setores` (
  `hotel_id` INT NOT NULL,
  `setor` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`hotel_id`, `setor`),
  CONSTRAINT `fk_hotel_setor`
    FOREIGN KEY (`hotel_id`)
    REFERENCES `sgh`.`hotel` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`espaco_eventos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`espaco_eventos` ;

CREATE TABLE IF NOT EXISTS `sgh`.`espaco_eventos` (
  `hotel_id` INT NOT NULL,
  `capacidade` INT NOT NULL,
  `infraestrutura` VARCHAR(45) NOT NULL,
  `status_limpeza` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`hotel_id`),
  CONSTRAINT `fk_espaco_hotel`
    FOREIGN KEY (`hotel_id`)
    REFERENCES `sgh`.`hotel` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`tipos_uso`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`tipos_uso` ;

CREATE TABLE IF NOT EXISTS `sgh`.`tipos_uso` (
  `hotel_id` INT NOT NULL,
  `tipo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`hotel_id`, `tipo`),
  CONSTRAINT `fk_tipo_uso_espaco`
    FOREIGN KEY (`hotel_id`)
    REFERENCES `sgh`.`espaco_eventos` (`hotel_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`estoque`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`estoque` ;

CREATE TABLE IF NOT EXISTS `sgh`.`estoque` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `hotel_id` INT NOT NULL,
  `nome` VARCHAR(60) NOT NULL,
  `quantidade` INT NOT NULL,
  `tipo_alimento` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_estoque_hotel`
    FOREIGN KEY (`hotel_id`)
    REFERENCES `sgh`.`hotel` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`piscina`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`piscina` ;

CREATE TABLE IF NOT EXISTS `sgh`.`piscina` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `hotel_id` INT NOT NULL,
  `tipo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_piscina_hotel`
    FOREIGN KEY (`hotel_id`)
    REFERENCES `sgh`.`hotel` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`garagem`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`garagem` ;

CREATE TABLE IF NOT EXISTS `sgh`.`garagem` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `hotel_id` INT NOT NULL,
  `preco_diario` DECIMAL(10,2) NOT NULL,
  `capacidade` INT NOT NULL,
  `tipo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_garagem_hotel`
    FOREIGN KEY (`hotel_id`)
    REFERENCES `sgh`.`hotel` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`armario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`armario` ;

CREATE TABLE IF NOT EXISTS `sgh`.`armario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `hotel_id` VARCHAR(45) NOT NULL,
  `preco_diario` DECIMAL(10,2) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_armario_hotel`
    FOREIGN KEY (`hotel_id`)
    REFERENCES `sgh`.`hotel` (`reg_imobiliario_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`funcionario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`funcionario` ;

CREATE TABLE IF NOT EXISTS `sgh`.`funcionario` (
  `cpf` VARCHAR(14) NOT NULL,
  `hotel_id` INT NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `sobrenome` VARCHAR(90) NOT NULL,
  `data_nascimento` DATE NOT NULL,
  `sexo` ENUM('M', 'F', 'Outro') NOT NULL,
  `salario` DECIMAL(10,2) NOT NULL,
  `tipo_contrato` VARCHAR(45) NOT NULL,
  `cargo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`cpf`),
  CONSTRAINT `fk_funcionario_hotel`
    FOREIGN KEY (`hotel_id`)
    REFERENCES `sgh`.`hotel` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`pagamento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`pagamento` ;

CREATE TABLE IF NOT EXISTS `sgh`.`pagamento` (
  `id` VARCHAR(48) NOT NULL,
  `funcinario_cpf` VARCHAR(14) NOT NULL,
  `valor_base` DECIMAL(10,2) NOT NULL,
  `acrescimo` DECIMAL(10,2) NOT NULL DEFAULT 0.0,
  `desconto` DECIMAL(10,2) NOT NULL DEFAULT 0.0,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_pagamento_funcionario`
    FOREIGN KEY (`funcinario_cpf`)
    REFERENCES `sgh`.`funcionario` (`cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`estabelecimento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`estabelecimento` ;

CREATE TABLE IF NOT EXISTS `sgh`.`estabelecimento` (
  `cnpj` VARCHAR(18) NOT NULL,
  `nome_fantasia` VARCHAR(45) NOT NULL,
  `tipo_condomino` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`cnpj`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`aluguel`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`aluguel` ;

CREATE TABLE IF NOT EXISTS `sgh`.`aluguel` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `estabelecimento_cnpj` VARCHAR(18) NOT NULL,
  `valor_base` DECIMAL(10,2) NOT NULL,
  `valor_juros` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `desconto` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`id`, `estabelecimento_cnpj`),
  CONSTRAINT `fk_aluguel_estabelecimento`
    FOREIGN KEY (`estabelecimento_cnpj`)
    REFERENCES `sgh`.`estabelecimento` (`cnpj`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`hospede`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`hospede` ;

CREATE TABLE IF NOT EXISTS `sgh`.`hospede` (
  `cpf` VARCHAR(14) NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `sobrenome` VARCHAR(90) NOT NULL,
  `email` VARCHAR(90) NOT NULL,
  `data_nascimento` DATE NOT NULL,
  `sexo` ENUM('M', 'F', 'Outro') NOT NULL,
  `pontos` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`cpf`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`requisicao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`requisicao` ;

CREATE TABLE IF NOT EXISTS `sgh`.`requisicao` (
  `id` VARCHAR(48) NOT NULL,
  `funcionario_cpf` VARCHAR(14) NOT NULL,
  `hospede_cpf` VARCHAR(14) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `tipo` VARCHAR(45) NOT NULL,
  `texto` TEXT NOT NULL,
  `data_abertura` DATETIME NOT NULL,
  `data_fechamento` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_requisicao_funcionario`
    FOREIGN KEY (`funcionario_cpf`)
    REFERENCES `sgh`.`funcionario` (`cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_requisicao_hospede`
    FOREIGN KEY (`hospede_cpf`)
    REFERENCES `sgh`.`hospede` (`cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`quarto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`quarto` ;

CREATE TABLE IF NOT EXISTS `sgh`.`quarto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `hotel_id` INT NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `preco` DECIMAL(10,2) NOT NULL,
  `descricao` TEXT NOT NULL,
  `tamanho` DOUBLE NOT NULL,
  `status_limpeza` VARCHAR(45) NOT NULL,
  `capacidade` INT NOT NULL,
  `tipo_acomodacao` VARCHAR(45) NOT NULL,
  `politicas_uso` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_quarto_hotel`
    FOREIGN KEY (`hotel_id`)
    REFERENCES `sgh`.`hotel` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`amenidade`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`amenidade` ;

CREATE TABLE IF NOT EXISTS `sgh`.`amenidade` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `quarto_id` INT NOT NULL,
  `descricao` VARCHAR(45) NOT NULL,
  `tipo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_amenidade_quarto`
    FOREIGN KEY (`quarto_id`)
    REFERENCES `sgh`.`quarto` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`itens_frigobar`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`itens_frigobar` ;

CREATE TABLE IF NOT EXISTS `sgh`.`itens_frigobar` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `quarto_id` INT NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `preco` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`, `quarto_id`),
  CONSTRAINT `fk_frigobar_quarto`
    FOREIGN KEY (`quarto_id`)
    REFERENCES `sgh`.`quarto` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`reserva`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`reserva` ;

CREATE TABLE IF NOT EXISTS `sgh`.`reserva` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `quarto_id` INT NOT NULL,
  `hospede_cpf` VARCHAR(14) NOT NULL,
  `data_checkin` DATETIME NOT NULL,
  `data_checkout` DATETIME NOT NULL,
  `preco` DECIMAL(10,2) NOT NULL,
  `num_quartos` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_reserva_quarto`
    FOREIGN KEY (`quarto_id`)
    REFERENCES `sgh`.`quarto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reserva_hospede`
    FOREIGN KEY (`hospede_cpf`)
    REFERENCES `sgh`.`hospede` (`cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`reserva_armario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`reserva_armario` ;

CREATE TABLE IF NOT EXISTS `sgh`.`reserva_armario` (
  `token` VARCHAR(48) NOT NULL,
  `reserva_id` INT NOT NULL,
  `armario_id` INT NOT NULL,
  PRIMARY KEY (`token`),
  CONSTRAINT `fk_armario_reserva`
    FOREIGN KEY (`reserva_id`)
    REFERENCES `sgh`.`reserva` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_armario_id`
    FOREIGN KEY (`armario_id`)
    REFERENCES `sgh`.`armario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`dias_uso_armario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`dias_uso_armario` ;

CREATE TABLE IF NOT EXISTS `sgh`.`dias_uso_armario` (
  `token_armario` VARCHAR(48) NOT NULL,
  `dia` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`token_armario`, `dia`),
  CONSTRAINT `fk_dia_armario`
    FOREIGN KEY (`token_armario`)
    REFERENCES `sgh`.`reserva_armario` (`token`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`reserva_garagem`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`reserva_garagem` ;

CREATE TABLE IF NOT EXISTS `sgh`.`reserva_garagem` (
  `token` VARCHAR(48) NOT NULL,
  `reserva_id` INT NOT NULL,
  `garagem_id` INT NOT NULL,
  PRIMARY KEY (`token`),
  CONSTRAINT `fk_garagem_reserva`
    FOREIGN KEY (`reserva_id`)
    REFERENCES `sgh`.`reserva` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_garagem_id`
    FOREIGN KEY (`garagem_id`)
    REFERENCES `sgh`.`garagem` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`dias_uso_garagem`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`dias_uso_garagem` ;

CREATE TABLE IF NOT EXISTS `sgh`.`dias_uso_garagem` (
  `token_garagem` VARCHAR(48) NOT NULL,
  `dia` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`token_garagem`, `dia`),
  CONSTRAINT `fk_dia_garagem`
    FOREIGN KEY (`token_garagem`)
    REFERENCES `sgh`.`reserva_garagem` (`token`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`servicos_quarto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`servicos_quarto` ;

CREATE TABLE IF NOT EXISTS `sgh`.`servicos_quarto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `reserva_id` INT NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `preco` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_servico_reserva`
    FOREIGN KEY (`reserva_id`)
    REFERENCES `sgh`.`reserva` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`movimentacao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`movimentacao` ;

CREATE TABLE IF NOT EXISTS `sgh`.`movimentacao` (
  `id` VARCHAR(48) NOT NULL,
  `data` TIMESTAMP NOT NULL,
  `tipo_movimentacao` VARCHAR(45) NOT NULL,
  `valor` DECIMAL(10,2) NOT NULL,
  `num_nota_fiscal` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`historico_caixa`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`historico_caixa` ;

CREATE TABLE IF NOT EXISTS `sgh`.`historico_caixa` (
  `id` INT NOT NULL,
  `movimentacao_id` VARCHAR(48) NOT NULL,
  `valor_atual` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_caixa_movimentacao`
    FOREIGN KEY (`movimentacao_id`)
    REFERENCES `sgh`.`movimentacao` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`terceirizado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`terceirizado` ;

CREATE TABLE IF NOT EXISTS `sgh`.`terceirizado` (
  `cnpj` VARCHAR(18) NOT NULL,
  `tipo` VARCHAR(45) NOT NULL,
  `nome_fantasia` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`cnpj`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`servico`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`servico` ;

CREATE TABLE IF NOT EXISTS `sgh`.`servico` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `terceirizado_cnpj` VARCHAR(18) NOT NULL,
  `movimentacao_id` VARCHAR(48) NOT NULL,
  `descricao` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_servico_terceirizado`
    FOREIGN KEY (`terceirizado_cnpj`)
    REFERENCES `sgh`.`terceirizado` (`cnpj`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_servico_movimentacao`
    FOREIGN KEY (`movimentacao_id`)
    REFERENCES `sgh`.`movimentacao` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`beneficio_comum`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`beneficio_comum` ;

CREATE TABLE IF NOT EXISTS `sgh`.`beneficio_comum` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `funcionario_cpf` VARCHAR(14) NOT NULL,
  `tipo` VARCHAR(45) NOT NULL,
  `descricao` TEXT NOT NULL,
  PRIMARY KEY (`id`, `funcionario_cpf`),
  CONSTRAINT `fk_func_beneficio_c`
    FOREIGN KEY (`funcionario_cpf`)
    REFERENCES `sgh`.`funcionario` (`cpf`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`beneficio_assalariado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`beneficio_assalariado` ;

CREATE TABLE IF NOT EXISTS `sgh`.`beneficio_assalariado` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `funcionario_cpf` VARCHAR(14) NOT NULL,
  `tipo` VARCHAR(45) NOT NULL,
  `valor` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`, `funcionario_cpf`),
  CONSTRAINT `fk_func_beneficio_a`
    FOREIGN KEY (`funcionario_cpf`)
    REFERENCES `sgh`.`funcionario` (`cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`hotel_estabelecimento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`hotel_estabelecimento` ;

CREATE TABLE IF NOT EXISTS `sgh`.`hotel_estabelecimento` (
  `hotel_id` INT NOT NULL,
  `cnpj` VARCHAR(18) NOT NULL,
  CONSTRAINT `fk_hotel_estabelecimento`
    FOREIGN KEY (`hotel_id`)
    REFERENCES `sgh`.`hotel` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_estabelecimento_hotel`
    FOREIGN KEY (`cnpj`)
    REFERENCES `sgh`.`estabelecimento` (`cnpj`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`reserva_itens_frigobar`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`reserva_itens_frigobar` ;

CREATE TABLE IF NOT EXISTS `sgh`.`reserva_itens_frigobar` (
  `reserva_id` INT NOT NULL,
  `item_frigobar_id` INT NOT NULL,
  `quarto_id` INT NOT NULL,
  `quantidade` INT NOT NULL,
  CONSTRAINT `fk_frigobar_reserva`
    FOREIGN KEY (`item_frigobar_id`)
    REFERENCES `sgh`.`itens_frigobar` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_reserva_frigobar`
    FOREIGN KEY (`reserva_id`)
    REFERENCES `sgh`.`reserva` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_frigobar_quarto_reserva`
    FOREIGN KEY (`quarto_id`)
    REFERENCES `sgh`.`itens_frigobar` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`reserva_piscina`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`reserva_piscina` ;

CREATE TABLE IF NOT EXISTS `sgh`.`reserva_piscina` (
  `reserva_id` INT NOT NULL,
  `piscina_id` INT NOT NULL,
  CONSTRAINT `fk_reserva_piscina`
    FOREIGN KEY (`reserva_id`)
    REFERENCES `sgh`.`reserva` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_piscina_reserva`
    FOREIGN KEY (`piscina_id`)
    REFERENCES `sgh`.`piscina` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`movimentacao_reserva`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`movimentacao_reserva` ;

CREATE TABLE IF NOT EXISTS `sgh`.`movimentacao_reserva` (
  `movimentacao_id` VARCHAR(48) NOT NULL,
  `reserva_id` INT NOT NULL,
  CONSTRAINT `fk_movimentacao_reserva`
    FOREIGN KEY (`movimentacao_id`)
    REFERENCES `sgh`.`movimentacao` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_reserva_movimentacao`
    FOREIGN KEY (`reserva_id`)
    REFERENCES `sgh`.`reserva` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`movimentacao_aluguel`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`movimentacao_aluguel` ;

CREATE TABLE IF NOT EXISTS `sgh`.`movimentacao_aluguel` (
  `movimentacao_id` VARCHAR(48) NOT NULL,
  `aluguel_id` INT NOT NULL,
  CONSTRAINT `fk_movimentacao_aluguel`
    FOREIGN KEY (`movimentacao_id`)
    REFERENCES `sgh`.`movimentacao` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_aluguel_movimentacao`
    FOREIGN KEY (`aluguel_id`)
    REFERENCES `sgh`.`aluguel` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgh`.`movimentacao_pagamento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sgh`.`movimentacao_pagamento` ;

CREATE TABLE IF NOT EXISTS `sgh`.`movimentacao_pagamento` (
  `movimentacao_id` VARCHAR(48) NOT NULL,
  `pagamento_id` VARCHAR(48) NOT NULL,
  CONSTRAINT `fk_movimentacao_pagamento`
    FOREIGN KEY (`movimentacao_id`)
    REFERENCES `sgh`.`movimentacao` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_pagamento_movimentacao`
    FOREIGN KEY (`pagamento_id`)
    REFERENCES `sgh`.`pagamento` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;
