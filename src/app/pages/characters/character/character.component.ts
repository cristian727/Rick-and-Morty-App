import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Character } from '../interface/character.interface';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterComponent {
  @Input() character!: Character;
  @Output() seeCharacterDetails = new EventEmitter<Character>();
}
