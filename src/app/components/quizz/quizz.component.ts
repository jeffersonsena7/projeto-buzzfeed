import { Component, OnInit } from '@angular/core';

//importando os dados json  que serão utilizados na tabela sem as chaves .
import quizz_questions from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  titulo: string = '';
  questions: any;
  questionSelected: any;
  respostas: string[] = [];
  respostaSelecionada: string = '';

  //os ponteiros criados  para o progresso do usuário no quiz e a contagem de acertos e erros.
  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  final: boolean = false;

  constructor() { }

  ngOnInit(): void {
    //criando a logica  do jogo de acordo com o json passado por parametro na rota /api/quizzez

    if (quizz_questions) {
      this.final = false
      this.titulo = quizz_questions.title;
      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      //para pegar a quantidade  de perguntas no array de questões.
      this.questionMaxIndex = this.questions.length;
    }
  }


  //criando o metodo para o botão  "Próxima Pergunta"
  playerChoose(value: string) {
    //para armazenar o valor  da resposta que foi clicada pelo jogador.
    this.respostas.push(value);
    this.nextStep() //ao clicar no botão vai para proxima resposta .
  }

  async nextStep() {

    this.questionIndex+=1; //acrescenta  o index em +1 a cada vez q é chamado esse método para andar pelo vetor dos dados que são 3 vetores.
    if (this.questionIndex < this.questionMaxIndex) { //se  o questionIndex for maior que a quantidade de perguntas, ele vai para proxima pergunta
      this.questionSelected = this.questions[this.questionIndex]; //isso muda para proxima pergunto, pois o questionIndex acrescentou + 1
    }
    else {
      this.final = true;

      //para aceitar o await tem q colocar async no inicio
      const finalResultado: string = await this.checkResult(this.respostas); // vai retornar um resultado se os valores forem certos ou errados da função, mas não consegui fazer funcionar sem ele.

      //para trazer o resultado
      this.respostaSelecionada = quizz_questions.
        results[finalResultado as keyof typeof quizz_questions.results];
      //keyof typeof  é usado pra dizer que ele é uma chave do mesmo tipo ou qualquer um dos valores do tipo de quizz_questions.results
    }
  }

  async checkResult(respostas: string[]) {
    const result = respostas.reduce((acumulador, resp, i, arr) => {
      if (
        arr.filter(item => item === acumulador).length > arr.filter(item => item == resp).length
      ) {
        return acumulador;
      } else {
        return resp;
      }
    });
    return result;
  }
}
