export interface Entry {
  date:Date,
  state: string,
}

export interface Goal {
  id: string,
  title: string,
  description: string,
  dateCreated: Date,
  entries?: Array<Entry>
}
