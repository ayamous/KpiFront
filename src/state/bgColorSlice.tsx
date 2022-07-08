import { createSlice } from '@reduxjs/toolkit'

export interface BgClrState {
  /* Menu */
  inUser : Boolean,
  inEntite : Boolean,
  inCategorie : Boolean,
  inSystemSource: Boolean,
  inGrpIndicateur: Boolean,
  /* MenuT */
  inPeriode :Boolean,
  inControle :Boolean,
  inEvaluations:Boolean,
  inGestAffect:Boolean,
}

const initialState: BgClrState = {
  inUser : false,
  inEntite: false,
  inCategorie : false,
  inSystemSource: false,
  inGrpIndicateur: false,
  /* MenuT */
  inPeriode :false,
  inControle :false,
  inEvaluations:false,
  inGestAffect:false,
}

export const bgColorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    inUser: (state) => {
      state.inUser = true
      state.inEntite = false
      state.inCategorie = false
      state.inSystemSource = false
      state.inGrpIndicateur = false
    },
    inEntite: (state) => {
      state.inUser = false
      state.inEntite = true
      state.inCategorie = false
      state.inSystemSource = false
      state.inGrpIndicateur = false
    },
    inCategorie: (state) => {
      state.inUser = false
      state.inEntite = false
      state.inCategorie = true
      state.inSystemSource = false
      state.inGrpIndicateur = false
    },
    inSystemSource: (state) => {
      console.log("sourceeeeeeeeeeee")
      state.inSystemSource = true
      state.inUser = false
      state.inEntite = false
      state.inCategorie = false
      state.inGrpIndicateur = false
    },
    inGrpIndicateur: (state) => {
      state.inUser = false
      state.inEntite = false
      state.inCategorie = false
      state.inSystemSource = false
      state.inGrpIndicateur = true
    },
    inPeriode: (state) => {
      state.inPeriode = true
      state.inControle = false
      state.inEvaluations = false
      state.inGestAffect = false
    },
    inControle: (state) => {
      state.inPeriode = false
      state.inControle = true
      state.inEvaluations = false
      state.inGestAffect = false
    },
    inEvaluations: (state) => {
      state.inPeriode = false
      state.inControle = false
      state.inEvaluations = true
      state.inGestAffect = false
    },
    inGestAffect: (state) => {
      state.inPeriode = false
      state.inControle = false
      state.inEvaluations = false
      state.inGestAffect = true
    },
  },
})
export const bgColorSliceActions = bgColorSlice.actions

export default bgColorSlice.reducer