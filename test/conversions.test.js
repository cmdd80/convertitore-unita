import { test } from 'node:test';
import assert from 'node:assert/strict';
import { convert } from '../src/conversions.js';

test('converte pollici in millimetri', () => {
  assert.equal(convert(1, 'in', 'mm'), 25.4);
});

test('converte metri in centimetri', () => {
  assert.equal(convert(2, 'm', 'cm'), 200);
});

test('rifiuta unità sconosciute', () => {
  assert.throws(() => convert(1, 'mm', 'parsec'), /non supportata/);
});

test('converte libbre-piede in newton metro', () => {
  assert.equal(convert(10, 'lbf-ft', 'Nm'), 13.558);
});

test('converte megapascal in bar', () => {
  assert.equal(convert(2, 'MPa', 'bar'), 20);
});

test('rifiuta grandezze diverse', () => {
  assert.throws(() => convert(1, 'bar', 'mm'), /Impossibile convertire/);
});

test('converte Celsius in Fahrenheit', () => {
  assert.equal(convert(100, 'C', 'F'), 212);
  assert.equal(convert(37, 'C', 'F'), 98.6);
  assert.equal(convert(-40, 'C', 'F'), -40);
});

test('converte Fahrenheit in Celsius', () => {
  assert.equal(convert(212, 'F', 'C'), 100);
  assert.equal(convert(98.6, 'F', 'C'), 37);
  assert.equal(convert(-40, 'F', 'C'), -40);
});

test('converte Celsius in Kelvin', () => {
  assert.equal(convert(0, 'C', 'K'), 273.15);
  assert.equal(convert(100, 'C', 'K'), 373.15);
});

test('converte Kelvin in Celsius', () => {
  assert.equal(convert(273.15, 'K', 'C'), 0);
  assert.equal(convert(0, 'K', 'C'), -273.15);
});

test('converte Fahrenheit in Kelvin', () => {
  assert.equal(convert(32, 'F', 'K'), 273.15);
  assert.equal(convert(-459.67, 'F', 'K'), 0);
});

test('converte Kelvin in Fahrenheit', () => {
  assert.equal(convert(273.15, 'K', 'F'), 32);
  assert.equal(convert(0, 'K', 'F'), -459.67);
});

test('converte una temperatura nella stessa unità', () => {
  assert.equal(convert(25, 'C', 'C'), 25);
  assert.equal(convert(77, 'F', 'F'), 77);
  assert.equal(convert(300, 'K', 'K'), 300);
});

test('rifiuta conversioni tra temperatura e altre grandezze', () => {
  assert.throws(() => convert(1, 'C', 'mm'), /Impossibile convertire/);
  assert.throws(() => convert(1, 'bar', 'K'), /Impossibile convertire/);
});
