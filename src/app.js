import 'dotenv/config';

import express from 'express';
import path from 'path';
import cors from 'cors';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import 'express-async-errors'; // Importar antes das rotas

import routes from './routes';
import sentryConfig from './config/sentry';

/**
 * Importa os arquivos de configuração e conexão com o BD
 */
import './database';

/**
 * O arquivo app.js buscara organizar a estrutura da aplicacao, bem
 * como todos as outras funcionalidades e plugins dentro de seus middlewares e rotas.
 * Essa separação de responsabilidades auxilia nos testes unitários e leitura de código
 */
class App {
  /**
   * Instancia o Express, os middlewares e rotas definidos dentro das funções.
   */
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(
      cors()
      // Inside cors: { origin: 'http://dominio-frontend.com' }
    );
    // Habilita o Express para receber requisições JSON, equivalente ao uso do body-parser
    this.server.use(express.json());
    // Permite disponibilizar arquivos estáticos via determinada URL
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    // Importa e usa as rotas de outro arquivo
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  /**
   * Middleware de tratamento de exceções
   */
  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

// Exporta o método server para uso externo
export default new App().server;
