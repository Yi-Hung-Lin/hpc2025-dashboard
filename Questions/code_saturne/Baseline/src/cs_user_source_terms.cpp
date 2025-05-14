/*============================================================================
 * Additional user-defined source terms for variable equations.
 *============================================================================*/

/* code_saturne version 8.3 */
/*
  This file is part of code_saturne, a general-purpose CFD tool.

  Copyright (C) 1998-2024 EDF S.A.

  This program is free software; you can redistribute it and/or modify it under
  the terms of the GNU General Public License as published by the Free Software
  Foundation; either version 2 of the License, or (at your option) any later
  version.

  This program is distributed in the hope that it will be useful, but WITHOUT
  ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
  FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more
  details.

  You should have received a copy of the GNU General Public License along with
  this program; if not, write to the Free Software Foundation, Inc., 51 Franklin
  Street, Fifth Floor, Boston, MA 02110-1301, USA.
*/

/*----------------------------------------------------------------------------*/

#include "cs_defs.h"

/*----------------------------------------------------------------------------
 * Standard C library headers
 *----------------------------------------------------------------------------*/

#include <assert.h>
#include <math.h>

/*----------------------------------------------------------------------------
 * PLE library headers
 *----------------------------------------------------------------------------*/

#include <ple_coupling.h>

/*----------------------------------------------------------------------------
 * Local headers
 *----------------------------------------------------------------------------*/

#include "cs_headers.h"

/*----------------------------------------------------------------------------*/

BEGIN_C_DECLS

/*----------------------------------------------------------------------------*/
/*!
 * \file cs_user_source_terms.cpp
 *
 * \brief Additional source terms for variable equations.
 *
 * See \ref user_source_terms for examples.
 */
/*----------------------------------------------------------------------------*/

/*============================================================================
 * User function definitions
 *============================================================================*/

/*----------------------------------------------------------------------------*/
/*!
 * \brief Additional user-defined source terms for variable equations
 *        (momentum, scalars, turbulence...).
 *
 *  This function is called at each time step, for each relevant field.
 *  It is therefore necessary to
 *  test the value of the field id or name to separate
 *  the treatments of the different variables.
 *
 *  The additional source term is decomposed into an explicit part (st_exp) and
 *  an implicit part (st_imp) that must be provided here.
 *  The resulting equation solved by the code for a scalar f is:
 *
 *    \f[ \rho*volume*\frac{df}{dt} + .... = st\_imp*f + st\_exp \f]
 *
 *  Note that st_exp and st_imp are defined after the Finite Volume integration
 *  over the cells, so they include the "volume" term. More precisely:
 *    - st_exp is expressed in kg.[var]/s, where [var] is the unit of the
 *      variable.
 *      Its dimension is the one of the variable (3 for vectors)
 *    - st_imp is expressed in kg/s.
 *      Its dimension is 1 for scalars, 3x3 for vectors.
 *
 *  The st_exp and st_imp arrays are already initialized to 0 (or a value
 *  defined through the GUI or defined by a model) before entering
 *  the function. It is generally not useful to reset them here.
 *
 *  For stability reasons, code_saturne will not add -st_imp directly to the
 *  diagonal of the matrix, but Max(-st_imp,0). This way, the st_imp term is
 *  treated implicitely only if it strengthens the diagonal of the matrix.
 *  However, when using the second-order in time scheme, this limitation cannot
 *  be done anymore and -st_imp is added directly. The user should therefore
 *  check for the negativity of st_imp.
 *
 *  When using the second-order in time scheme, one should supply:
 *    - st_exp at time n
 *    - st_imp at time n+1/2
 *
 *  \warning
 *  \parblock
 *
 *   If the variable is a temperature, the resulting equation solved is:
 *
 *   rho*Cp*volume*dT/dt + .... = st_imp*T + st_exp
 *
 *  \endparblock
 *
 *  Note that st_exp and st_imp are defined after the Finite Volume integration
 *  over the cells, so they include the "volume" term. More precisely:
 *    - st_exp is expressed in W
 *    - st_imp is expressed in W/K
 *
 *  \par Steep source terms
 *  \parblock
 *
 *  In case of a complex, non-linear source term, say F(f), for variable f, the
 *  easiest method is to implement the source term explicitly.
 *
 *    df/dt = .... + F(f(n))
 *    where f(n) is the value of f at time tn, the beginning of the time step.
 *
 *  This yields:
 *    st_exp = volume*F(f(n))
 *    st_imp = 0
 *
 *  However, if the source term is potentially steep, this fully explicit
 *  method will probably generate instabilities. It is therefore wiser to
 *  partially implicit the term by writing:
 *
 *    df/dt = .... + dF/df*f(n+1) - dF/df*f(n) + F(f(n))
 *
 *  This yields:
 *    st_exp = volume*( F(f(n)) - dF/df*f(n) )
 *    st_imp = volume*dF/df
 *
 *  \endparblock
 *
 * \param[in, out]  domain   pointer to a cs_domain_t structure
 * \param[in]       f_id     field id of the variable
 * \param[out]      st_exp   explicit source term
 * \param[out]      st_imp   implicit part of the source term
 */
/*----------------------------------------------------------------------------*/

void
cs_user_source_terms(cs_domain_t  *domain,
                     int           f_id,
                     cs_real_t    *st_exp,
                     cs_real_t    *st_imp)
{
  
  CS_NO_WARN_IF_UNUSED(st_imp);
  /* Declarations */
  /* field structure */
  const cs_field_t * f = cs_field_by_id(f_id);
  /* mesh quantities */
  const cs_lnum_t n_cells = cs_glob_mesh -> n_cells;
  const cs_real_t * restrict cell_vol = (const cs_real_t * restrict)
  domain -> mesh_quantities -> cell_vol;
  const cs_real_t * cell_f_vol = cs_glob_mesh_quantities -> cell_f_vol;
  const cs_real_t CpW = 4184.0; //Heat capacity of water
  const cs_real_t Dpan = 997.0; //Density of water (kg/m3)
  cs_real_t TempInc; //Increase in temperature required (seconds)
  cs_real_t TimeInc; //Time required for temperature increase (seconds)
  //CS_UNUSED(domain);
  //CS_UNUSED(f_id);
  //CS_UNUSED(st_exp);
  //CS_UNUSED(st_imp);
  if (f == CS_F_(t)) {
    /* Access temperature field*/
    cs_real_t * cvar_temperature = CS_F_(t) -> val;
    TempInc = 170.0;
    TimeInc = 180.0;
    /* Declaration arrays to find the cells */
    cs_lnum_t n_selected_cells = 0;
    cs_lnum_t * selected_cells = NULL;
    char SelectVol[]="cylinder[3.87,0.21,0.89,3.87,0.21,0.96,0.12]";
    /* allocate memory */
    BFT_MALLOC(selected_cells, n_cells, cs_lnum_t);
    /* Function to find cells within selected regio */
    cs_selector_get_cell_list(SelectVol, &n_selected_cells,selected_cells);
    /* Properly resize the memory */
    BFT_REALLOC(selected_cells, n_selected_cells, cs_lnum_t);
    /* Get volume*/
    cs_real_t Vol = 0.0;
    for (cs_lnum_t ii = 0; ii < n_selected_cells; ii++) {
      cs_lnum_t iel = selected_cells[ii];
      Vol += cell_vol[iel];
    }
  /* loop for adding the heat source */
    cs_gnum_t TotCells = (cs_gnum_t) n_selected_cells;
  /* Parallel operations to sum over all ranks */
    cs_parall_sum(1, CS_DOUBLE, &Vol);
    cs_parall_counter( &TotCells, 1);
    cs_real_t MW = Dpan * Vol; // Mass in kg
  /*Explicit source term in W, divided by number of cells*/
    cs_real_t S = ((CpW / TimeInc) * MW * TempInc) / TotCells;
    for (cs_lnum_t ii = 0; ii < n_selected_cells; ii++) {
      if (cvar_temperature[selected_cells[ii]] < 180.0) {
        st_exp[selected_cells[ii]] = S;
        st_imp[selected_cells[ii]] = 0.0;
      } else {
        st_imp[selected_cells[ii]] = 0.0;
        st_exp[selected_cells[ii]] = 0.0;
      }
    }
    /* Free the memory */
    BFT_FREE(selected_cells);
  }
  if (f == CS_F_(vel) && CS_F_(t) != NULL) {
    /* Reference density */
    const cs_real_t ro0 = cs_glob_fluid_properties -> ro0;
    const cs_real_t t0 = cs_glob_fluid_properties -> t0;
    const cs_real_t grav_z = -9.81;
    /* get temperature */
    const cs_real_t * cvar_temperature = CS_F_(t) -> val;
    /* source term (in z direction here) */
    cs_real_3_t * _st_exp = (cs_real_3_t * ) st_exp;
    for (cs_lnum_t i = 0; i < n_cells; i++) {
    _st_exp[i][2] = -cell_f_vol[i] *
    (ro0 * (grav_z) / (t0 + 273.15)) * (cvar_temperature[i] - t0);
    }
  }
}

/*----------------------------------------------------------------------------*/

END_C_DECLS
