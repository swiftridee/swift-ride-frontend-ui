
import { RentalPlan } from "@/types";

// Pricing matrix based on the updated requirements
const pricingMatrix = {
  car: {
    base: {
      "12hour": 5000,
      "2day": 9500,
      "3day": 14000,
      "1week": 28000
    },
    withDriver: {
      "12hour": 6500,
      "2day": 12500,
      "3day": 18000,
      "1week": 36000
    }
  },
  minibus: {
    base: {
      "12hour": 17000,
      "2day": 32000,
      "3day": 46000,
      "1week": 90000
    },
    withDriver: {
      "12hour": 19500,
      "2day": 36000,
      "3day": 51000,
      "1week": 99000
    }
  },
  coaster: {
    base: {
      "12hour": 12000,
      "2day": 22500,
      "3day": 33000,
      "1week": 65000
    },
    withDriver: {
      "12hour": 14500,
      "2day": 26500,
      "3day": 38000,
      "1week": 73000
    }
  },
  bus: {
    base: {
      "12hour": 25000,
      "2day": 48000,
      "3day": 70000,
      "1week": 130000
    },
    withDriver: {
      "12hour": 29000,
      "2day": 56000,
      "3day": 81000,
      "1week": 144000
    }
  }
};

// Calculate price based on vehicle type, rental plan, and driver option
export const calculatePrice = (
  vehicleType: "car" | "bus" | "minibus" | "coaster",
  rentalPlan: RentalPlan,
  withDriver: boolean
): number => {
  if (withDriver) {
    return pricingMatrix[vehicleType].withDriver[rentalPlan];
  } else {
    return pricingMatrix[vehicleType].base[rentalPlan];
  }
};
