export type Entry = {
  data:Date,
  state: string,
}

export type Goal = {
  title: string,
  description: string,
  dateCreated: Date,
  entries: Array<Entry>
}
