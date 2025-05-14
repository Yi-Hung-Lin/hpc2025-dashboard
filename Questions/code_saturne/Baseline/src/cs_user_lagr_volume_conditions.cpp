/*============================================================================
 * Lagrangian volume injection definitions.
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

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>

/*----------------------------------------------------------------------------
 * Local headers
 *----------------------------------------------------------------------------*/

#include "cs_headers.h"

/*----------------------------------------------------------------------------*/

BEGIN_C_DECLS

/*============================================================================
 * User function definitions
 *============================================================================*/

/*----------------------------------------------------------------------------*/
/*!
 * \brief Define particle volume conditions.
 *
 * This is used for the definition of volume injections,
 * based on predefined volume zones (\ref cs_zone_t).
 */
/*----------------------------------------------------------------------------*/

void
cs_user_lagr_volume_conditions(void)
{
  cs_lagr_zone_data_t *lagr_vol_conds = cs_lagr_get_volume_conditions();
  const cs_zone_t *z = cs_volume_zone_by_name("particle_injection");
  const int ttcabs = cs_glob_time_step ->t_cur;
  /* Inject particle set */
  cs_gnum_t n_inject1[] = {300,300,250};
  cs_gnum_t n_inject2[] = {1000,1000,2000};
  cs_real_t diam[] = {0.5e-6, 1e-6, 2.5e-6};
  cs_real_t diam_dev[] = {1e-8, 1e-8,0.7e-6};
  cs_real_t density[] = {1000., 1000.,1000};
  cs_real_t flowrate1[] = {1.6665e-11,1.6665e-11,3.333e-11};
  cs_real_t flowrate2[] = {1.33325e-8,1.33325e-8,2.665e-8};
  for (int set_id = 0; set_id < 3; set_id++) {
  cs_lagr_injection_set_t *zis
  = cs_lagr_get_injection_set(lagr_vol_conds, z->id, set_id);
  zis->injection_frequency = 1;
  if (cs_glob_lagr_model->n_stat_classes > 0)
    zis->cluster = set_id + 1;
    zis->velocity_profile = -1; /* fluid velocity */
    zis->diameter = diam[set_id];
    zis->diameter_variance = diam_dev[set_id];
    zis->density = density[set_id];
    if (ttcabs <= 180){
    zis->flow_rate =flowrate1[set_id]*(ttcabs+1);
    zis->n_inject = n_inject1[set_id];
    } else {
    zis->flow_rate =flowrate2[set_id];
    zis->n_inject = n_inject2[set_id];
    }
  }
}

/*----------------------------------------------------------------------------*/
/*!
 * \brief Handling of a particle interaction with a interior face of type
 *        \ref CS_LAGR_BC_USER.
 *
 * \param[in, out]  particles       pointer to particle set
 * \param[in]       p_id            particle id
 * \param[in]       face_id         interior face id
 * \param[in]       face_norm       unit face (or face subdivision) normal
 * \param[in]       c_intersect     coordinates of intersection with the face
 * \param[in]       t_intersect     relative distance (in [0, 1]) of the
 *                                  intersection point with the face relative
 *                                  to the initial trajectory segment
 * \param[in, out]  tracking_state  particle tracking state
 */
/*----------------------------------------------------------------------------*/

void
cs_lagr_user_internal_interaction(cs_lagr_particle_set_t    *particles,
                                  cs_lnum_t                  p_id,
                                  cs_lnum_t                  face_id,
                                  const cs_real_t            face_norm[3],
                                  const cs_real_t            c_intersect[3],
                                  cs_real_t                  t_intersect,
                                  cs_lagr_tracking_state_t  *tracking_state)
{
  CS_UNUSED(particles);
  CS_UNUSED(p_id);
  CS_UNUSED(face_id);
  CS_UNUSED(face_norm);
  CS_UNUSED(c_intersect);
  CS_UNUSED(t_intersect);
  CS_UNUSED(tracking_state);
}

/*----------------------------------------------------------------------------*/

END_C_DECLS
