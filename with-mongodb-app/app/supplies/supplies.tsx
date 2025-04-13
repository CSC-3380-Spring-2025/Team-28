"use client";
import React, { useState } from 'react';

type Entry = {
  item: string;
  amount: number;
  price: number;
};

export default function Supplies() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [form, setForm] = useState({ item: '', amount: '', price: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(form.amount, 10);
    const price = parseFloat(form.price);
    if (isNaN(amount) || isNaN(price)) return;

    const newEntry = { item: form.item, amount, price };
    setEntries([...entries, newEntry]);
    setForm({ item: '', amount: '', price: '' });
  };

  const total = entries.reduce((sum, entry) => sum + entry.amount * entry.price, 0);

  return (
    <div>
      <h1>Supplies</h1>
      <form onSubmit={handleSubmit}>
        <input id="item" value={form.item} onChange={handleChange} required placeholder="Item" />
        <input id="amount" value={form.amount} onChange={handleChange} required placeholder="Amount" type="number" />
        <input id="price" value={form.price} onChange={handleChange} required placeholder="Price" type="number" step="0.01" />
        <button type="submit">Submit</button>
      </form>
      <table>
        <thead>
          <tr><th>Item</th><th>Amount</th><th>Price</th></tr>
        </thead>
        <tbody>
          {entries.map((entry, idx) => (
            <tr key={idx}>
              <td>{entry.item}</td>
              <td>{entry.amount}</td>
              <td>${entry.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr><td colSpan={2}></td><td>Total: ${total.toFixed(2)}</td></tr>
        </tfoot>
      </table>
    </div>
  );
}
