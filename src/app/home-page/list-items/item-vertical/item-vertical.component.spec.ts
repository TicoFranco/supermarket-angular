import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemVerticalComponent } from './item-vertical.component';

describe('ItemVerticalComponent', () => {
  let component: ItemVerticalComponent;
  let fixture: ComponentFixture<ItemVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemVerticalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
